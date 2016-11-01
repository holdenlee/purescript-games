module RandomTest where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Random (RANDOM)
import Signal (Signal, runSignal, foldp)
import Signal.Time (second, every)
import Test.QuickCheck.Gen (Gen, chooseInt)
--import Partial.Unsafe (unsafePartial)
--import Data.EuclideanRing
--import Math

import SignalM

--MODEL
type Model = Int

step :: forall a. a -> Model -> Gen Model
step a m = 
    do
      i <- chooseInt 0 1
      pure (m + i)

--MAIN
main :: Eff _ Unit
main = --unsafePartial 
    do
      game <- foldpR step 0 (every second)
      runSignal (map logShow game)

logShow :: forall e. Model -> Eff (console :: CONSOLE | e) Unit
logShow m = log ("m: " <> (show m))

{-
main :: Eff _ Int
main = 
    do
      r <- randomInt 1 10
      foldM (\x y -> 
                 do
                   log (show x)
                   if y `mod` 10 == 0 
                     then randomInt 1 10
                     else pure x) 
                r (1..100)
-}
{-
  x <- randomInt 1 10
  log (show x)
  log (show x)
  log (show x)
  pure unit
-}
