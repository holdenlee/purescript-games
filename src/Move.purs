module Move where

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

type Model = {loc :: Point, xd :: Int, yd :: Int, dir :: Point, size :: Int}
-- prev is the last place the snake was. This is to erase easily.

init :: forall e. Eff (random :: RANDOM | e) Model
init = do
  let psize = 10
  let xmax = 25
  let ymax = 25
  pure {xd : xmax, yd : ymax, loc : point 1 1, dir : point 1 0, size : psize}

inBounds :: Point -> Model -> Boolean
inBounds p m = 
  (getX p > 0) && (getY p > 0) && (getX p <= m.xd) && (getY p <= m.yd)

untilM :: forall m a. (Monad m) => (a -> Boolean) -> m a -> m a
untilM cond ma = 
    do 
      x <- ma
      if cond x then pure x else untilM cond ma

step :: forall e. Partial => Point -> Eff (random :: RANDOM , console :: CONSOLE | e) Model -> Eff (random :: RANDOM , console :: CONSOLE| e) Model --need 2nd argument to be Eff for foldp
step dir m' = 
  do
    m <- m'
    let d = if dir /= Point {x:0,y:0}
            then dir
            else m.dir
    log "move"
    log ("m: " <> (show m.loc))
    pure (m {loc = m.loc +. d})

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
input = sampleOn (fps 1.0) <$> inputDir
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
      --gameStart <- init
      --render gameStart
      -- create the signals
      dirSignal <- input
      -- need to be in effect monad in order to get a keyboard signal
      -- (pure gameStart)
      let game = foldp step init dirSignal
      runSignal (map void game)
      --runSignal (map (\x -> x >>= render) game)
-- map render (foldp step (init 0) input)

randomPoint :: forall e. Int -> Int -> Eff (random :: RANDOM | e) Point
randomPoint xmax ymax = 
    do
      x <- randomInt 1 xmax
      y <- randomInt 1 ymax
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


--forall eff. Partial => Model -> (Eff (canvas :: CANVAS | eff) Unit)
render :: forall eff. Partial => Model -> (Eff _ Unit)
render m = 
      do
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
        colorSquare m.size m.loc snakeColor ctx
        pure unit

bindR :: forall a b m. (Monad m) => m a -> m b -> m b
bindR mx my = mx >>= const my

infixl 0 bindR as >>
