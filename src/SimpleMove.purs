module SimpleMove where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Data.Functor
import Data.Int
import Signal (Signal, runSignal, foldp, sampleOn, map2)
import Signal.DOM (keyPressed)
import Signal.Time (Time, second, every)
import Partial.Unsafe (unsafePartial)

--MODEL
type Model = Int

logShow :: forall e. Model -> Eff (console :: CONSOLE | e) Unit
logShow m = log ("m: " <> (show m))

step :: Int -> Model -> Model
step dir m = m + dir
{-
  do
    m <- m'
    log ("m: " <> (show m))
    pure (m + dir)
-}

--SIGNALS
inputDir :: Eff _ (Signal Int)
inputDir = 
    let 
        f = \l r -> if l 
                    then -1 
                    else if r
                         then 1
                         else 0
    in
      map2 f <$> (keyPressed 37) <*> (keyPressed 39)

input :: Eff _ (Signal Int)
input = sampleOn (every second) <$> inputDir

--MAIN
main :: Eff _ Unit
main =
    unsafePartial do
      dirSignal <- input
      let game = foldp step 0 dirSignal
      runSignal (map logShow game)
