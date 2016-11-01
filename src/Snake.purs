module Snake where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Random (RANDOM, randomInt)
import Data.Array
import Data.Functor
import Data.Generic
import Data.Int
import Data.Maybe
import Data.Traversable
import Data.Tuple
--import DOM (DOM)
import Graphics.Canvas (CANVAS, closePath, lineTo, moveTo, fillPath,
                        setFillStyle, arc, rect, getContext2D,
                        getCanvasElementById, Context2D)
import Partial.Unsafe (unsafePartial)
import Signal (Signal, runSignal, foldp, sampleOn, map4)
import Signal.DOM (keyPressed)
import Signal.Time (Time, second, every)
import Test.QuickCheck.Gen

import SignalM

newtype Point = Point {x :: Int, y :: Int}
-- also: CoordinatePair in Signal.DOM
-- http://www.purescript.org/learn/generic/

derive instance genericPoint :: Generic Point

instance eqPoint :: Eq Point where
    eq = gEq
instance showPoint :: Show Point where
    show = gShow

point :: Int -> Int -> Point
point x y = Point {x : x, y : y}
-- { x: _, y: _ }

getX :: Point -> Int
getX (Point p) = p.x

getY :: Point -> Int
getY (Point p) = p.y

pplus :: Point -> Point -> Point
pplus v1 v2 = Point {x : (getX v1) + (getX v2), y : (getY v1) + (getY v2)}

infix 6 pplus as +.

type Snake = Array Point

type Model = {xd :: Int, yd :: Int, size :: Int, mouse:: Point, snake :: Snake, dir :: Point, alive :: Boolean, prev :: Maybe Point}
-- prev is the last place the snake was. This is to erase easily.


init :: forall e. Eff (random :: RANDOM | e) Model
init = do
  let psize = 10
  let xmax = 25
  let ymax = 25
  ms <- evalGenD $ untilM (\p -> p /= Point {x:1, y:1}) (randomPoint' xmax ymax)
  pure {xd : xmax, yd : ymax, size : psize , mouse : ms, snake : [Point {x:1,y:1}], dir: Point {x:1,y:0}, alive : true, prev : Nothing}

inBounds :: Point -> Model -> Boolean
inBounds p m = 
  (getX p > 0) && (getY p > 0) && (getX p <= m.xd) && (getY p <= m.yd)

checkOK :: Point -> Model -> Boolean
checkOK pt m = 
  let
    s = m.snake
  in
    m.alive && (inBounds pt m) && not (pt `elem` s)

untilM :: forall m a. (Monad m) => (a -> Boolean) -> m a -> m a
untilM cond ma = 
    do 
      x <- ma
      if cond x then pure x else untilM cond ma
{- 
    if cond x 
    then pure x
    else f x >>= untilM cond f
-}


step :: forall e. Partial => Point -> Model -> Gen Model --need 2nd argument to be Eff for foldp
step dir m = 
  do
    let d = if dir /= Point {x:0,y:0}
            then dir
            else m.dir
    let s = m.snake
    let hd = (head' s +. d)
    if checkOK hd m
      then 
        if (hd == m.mouse) 
        then 
            do 
              newMouse <- untilM (\pt -> not (pt `elem` s || pt == hd)) (randomPoint' m.xd m.yd)
--              log "new mouse"
              pure $ m { snake = hd : s
                       , mouse = newMouse
                       , dir = d
                       , prev = Nothing -- snake grows; nothing is deleted
                       }
        else (pure $ m { snake = hd : (body s)
                      , dir = d
                      , prev = last s -- snake moves; the last pixel is deleted
                      })
      else (pure $ m { alive = false, prev = Nothing})

--SIGNALS

--(dom :: DOM | e)
inputDir :: Eff _ (Signal Point)
inputDir = 
    let 
        f = \l u d r -> ifs [Tuple l $ Point {x: -1,y:0}, Tuple u $ Point {x:0,y: -1}, Tuple d $ Point {x:0, y : 1}, Tuple r $ Point {x : 1,y: 0}] $ Point {x:0,y:0}
--note y goes DOWN
    in
      map4 f <$> (keyPressed 37) <*> (keyPressed 38) <*> (keyPressed 40) <*> (keyPressed 39)
--(dom :: DOM | e)
input :: Eff _ (Signal Point)
input = sampleOn (fps 20.0) <$> inputDir
--(random :: RANDOM, dom :: DOM)

{-
main :: Eff (canvas :: CANVAS) Unit
main = void $ unsafePartial do
  Just canvas <- getCanvasElementById "canvas"
  ctx <- getContext2D canvas

  setFillStyle "#0000FF" ctx

  fillPath ctx $ rect ctx
    { x: 250.0
    , y: 250.0
    , w: 100.0
    , h: 100.0
    }
-}

main :: Eff _ Unit
main = --onDOMContentLoaded 
    void $ unsafePartial do
      --draw the board
      gameStart <- init
      render gameStart
      -- create the signals
      dirSignal <- input
      -- need to be in effect monad in order to get a keyboard signal
      game <- foldpR step gameStart dirSignal
      runSignal (map render game)
-- map render (foldp step (init 0) input)

randomPoint :: forall e. Int -> Int -> Eff (random :: RANDOM | e) Point
randomPoint xmax ymax = 
    do
      x <- randomInt 1 xmax
      y <- randomInt 1 ymax
      pure $ Point {x:x,y:y}

randomPoint' :: Int -> Int -> Gen Point
randomPoint' xmax ymax = 
    do
      x <- chooseInt 1 xmax
      y <- chooseInt 1 ymax
      pure $ Point {x:x,y:y}

fps :: Time -> Signal Time
fps x = every (second/x)

--Utility functions

ifs:: forall a. Array (Tuple Boolean a) -> a -> a
ifs li z = case uncons li of
             Just {head : Tuple b y, tail : tl} -> if b then y else ifs tl z
             Nothing         -> z 

--Array functions
head' :: forall a. Partial => Array a -> a
head' = fromJust <<< head

last' :: forall a. Partial => Array a -> a
last' = fromJust <<< last

tail' :: forall a. Array a -> Array a
tail' = fromMaybe [] <<< tail

body :: forall a. Array a -> Array a
body li = slice 0 ((length li) - 1) li

colorSquare :: forall eff. Int -> Point -> String -> Context2D -> Eff (canvas :: CANVAS | eff) Context2D
colorSquare size pt color ctx = do
  setFillStyle color ctx
  fillPath ctx $ rect ctx
    { x: toNumber $ size*(getX pt)
    , y: toNumber $ size*(getY pt)
    , w: toNumber $ size
    , h: toNumber $ size
    }

white = "#FFFFFF"
black = "#000000"
red = "#FF0000"
yellow = "#FFFF00"
green = "#008000"
blue = "#0000FF"
purple = "800080"

snakeColor = white
bgColor = black
mouseColor = red
wallColor = green

renderStep :: forall eff. Partial => Model -> Eff (canvas :: CANVAS | eff) Unit
renderStep m = 
      do
        let s=m.snake
        Just canvas <- getCanvasElementById "canvas"
        ctx <- getContext2D canvas
        colorSquare m.size (head' s) snakeColor ctx
        --black 
        case m.prev of
          Nothing -> colorSquare m.size (m.mouse) mouseColor ctx
          Just end -> colorSquare m.size end bgColor ctx
        --make use of the fact: either we draw the mouse or erase the tail, not both, at any one step
        pure unit

--forall eff. Partial => Model -> (Eff (canvas :: CANVAS | eff) Unit)
render :: forall eff. Partial => Model -> (Eff _ Unit)
render m = 
      do
        let s = m.snake
        let size = m.size
        Just canvas <- getCanvasElementById "canvas"
        ctx <- getContext2D canvas
        --walls
        setFillStyle wallColor ctx
        fillPath ctx $ rect ctx
                     { x: 0.0
                     , y: 0.0
                     , w: toNumber $ size*(m.xd + 2)
                     , h: toNumber $ size*(m.yd + 2)
                     }
        --interior
        setFillStyle bgColor ctx
        fillPath ctx $ rect ctx
                     { x: toNumber $ size
                     , y: toNumber $ size
                     , w: toNumber $ size*(m.xd)
                     , h: toNumber $ size*(m.yd)
                     }
        --snake 
        for s (\x -> colorSquare m.size x snakeColor ctx)
        --mouse
        colorSquare m.size (m.mouse) mouseColor ctx
        log ("Mouse: " <> show (m.mouse))
        log ("Snake: " <> show s)
        log ("Direction: " <> show m.dir)
        log ("Alive? " <> show m.alive)
        log ("Head == mouse? " <> show (head' s == m.mouse))
        pure unit

bindR :: forall a b m. (Monad m) => m a -> m b -> m b
bindR mx my = mx >>= const my

infixl 0 bindR as >>
