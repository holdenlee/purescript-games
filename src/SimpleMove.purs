module SimpleMove where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Data.Functor
import Data.Int
import Signal (Signal, runSignal, foldp, sampleOn, map2)
import Signal.DOM (keyPressed)
import Signal.Time (Time, second, every)
import Partial.Unsafe (unsafePartial)

--MODEL
type Model = Int

--UPDATE
step :: Int -> Model -> Model
step dir m = m + dir

--VIEW
logShow :: forall e. Model -> Effect Unit
logShow m = log ("m: " <> (show m))

--SIGNAL
inputDir :: Effect (Signal Int)
inputDir = 
    let 
        f = \l r -> if l 
                    then -1 
                    else if r
                         then 1
                         else 0
    in
      map2 f <$> (keyPressed 37) <*> (keyPressed 39)

input :: Effect (Signal Int)
input = sampleOn (every second) <$> inputDir

--MAIN
main :: Effect Unit
main =
    unsafePartial do
      dirSignal <- input
      let game = foldp step 0 dirSignal
      runSignal (map logShow game)
