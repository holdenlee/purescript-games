module SignalM where

import Prelude
import Effect (Effect)
--import Effect.Random (RANDOM)
import Control.Monad.State
import Data.Tuple
import Test.QuickCheck
import Test.QuickCheck.Gen (Gen, runGen, evalGen, GenState)
import Signal

--runState :: forall s a. State s a -> s -> Tuple a s

foldpM :: forall a b mb c. (mb -> c -> Tuple b c) -> c -> (a -> b -> mb) -> b -> (Signal a) -> (Signal b)
foldpM run st' f st sig = map fst $ foldp (\xa (Tuple xb xc) -> uncurry run (Tuple (f xa xb) xc)) (Tuple st st') sig

foldpR' :: forall a b. GenState -> (a -> b -> Gen b) -> b -> (Signal a) -> (Signal b)
foldpR' = foldpM runGen
-- $ runState . unGen

foldpR :: forall a b e. (a -> b -> Gen b) -> b -> (Signal a) -> Effect (Signal b)
foldpR f st sig = 
    do
      seed <- randomSeed
      pure $ foldpR' { newSeed : seed, size : 536870911} f st sig

evalGenD :: forall a e. Gen a -> Effect a
evalGenD g = 
    do
      seed <- randomSeed
      pure $ evalGen g {newSeed : seed, size : 536870911}
