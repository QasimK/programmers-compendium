# Testing

Tests can be divided by size:

* unit-tests - tiny, no IO, no other components involved \(small\) - fast
* integration tests - test combined units \(medium-large\) - slow
* system tests - test multiple high-level stages \(large\) - slow

They can be divided by methodology:

* functional tests - functional programming, test output based on input \(NB: also used to refer to testing features\)
* acceptance tests - the final end result \(black-box\) tested at the highest, outer-most level \(e.g. using your web app with a web browser\)

They can be devided by purpose:

* smoke tests - a subset of tests that quickly reveal severe failures
* regression tests - tests that catch bugs that come back, or features that stop working

They can be divided by who is doing them:

* end-to-end tests - performed by QA involving multiple distinct steps to accomplish a goal
* user acceptance tests - performed by non-technical business users or otherwise domain-experts to test whether they accept the software in their heart

The naming and boundaries are fairly fuzzy so don't worry about it.

Tests accomplish two main goals:

* What you've written now is right, including incorporating business requirement directly as a test.
* What you've written stays right, including allow refactorings with confidence \(increase development speed; reduce regressions\). It leaves a bad impression \(on clients\) if a bug keeps reappearing, and demoralises developers.

Software Quality Assurance \(SQA\) looks at the development process itself to reduce the number of issues.

You also have operation acceptance tests, which test things like failover, backups, recoveries, performance, monitoring, and alerting.

## Principles

* The tests can help guide you towards a nice API, e.g. write the final candidate API with its integration tests and write the lower level details to advance the integration test as needed with unit-tests alongside it. i.e. Write what a thing is supposed to do
* Found a bug? Write a test that verifies it, then fix it. \(Usually.\)
* Arrange-Act-Assert \(AAA\): set up the test, execute your code, check against expected results. I usually do Arrange-Assert-Act-Assert.
  * This is also known as Given-When-Then in Behaviour-Driven Development \(BDD\) which uses the friendly english language to express the requirements.

## Automated Code Review

* Static code analysis
* Data-flow analysis?
* Code coverage

## How to Mock

Don't. Ref: [https://www.youtube.com/watch?v=Xu5EhKVZdV8](https://www.youtube.com/watch?v=Xu5EhKVZdV8)

Stubs - Mock/Fake implementations.

Mocks - Empty "implementations".

How to Test: https://www.destroyallsoftware.com/talks/boundaries

