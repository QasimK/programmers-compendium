# Refactoring

Notes from _Refactoring: Improving the Design of Existing Code, Second Edition_.

> "The whole purpose of refactoring is to make us program faster, producing more value with less effort."  
> Refactoring p56, Martin Fowler

> "for each desired change, make the change easy \(warning: this may be hard\), then make the easy change"  
> Kent Beck, Twitter

> paraphrasing: going 20 miles north, 100 miles east on the motorway and back down is faster than going 100 miles east through the woods. "sometimes you need to say, 'wait, I need to ceck the map and find the quickest route'."
>
> Refactoring p51, Jessica Kerr

## Key Ideas

* A refactoring is a small change to the structure of the code to make it easier to understand and cheaper to modify without modifying its observable behaviour.
* This means, the codebase is _never_ left in a broken state, and you can always stop refactoring even if you haven't finished.
* Change-Compile-Test-Commit.
* \(When you succumbed to the temptation of making a larger multi-step refactoring in one go and the tests fail, simply revert the code and do the smaller steps!\)
* The rule of three: the first time you just do it, the second time you wince but you do it anyway, and the third time you refactor.
* Design Stamina Hypothesis.
* Two hats: two mutually exclusive activities of "adding functionality" and "refactoring". The former mostly involves adding new tests and getting them to work, the latter doesn't need new tests to be added \(unless you find some were missing\).
* The distinct types of _opportunistic_ refactoring \(following the boy-scout principle\):
  * Preparatory refactoring - making it easier to add a feature
  * Comprehension refactoring - making code easier to understand
  * Litter-pickup refactoring - coming across bad code

Don't justify refactoring in terms of "clean code", "good engineering practice", or other moral reasons. Instead, communicate with the core economic benefits: it makes us faster to add features and faster to fix bugs.



