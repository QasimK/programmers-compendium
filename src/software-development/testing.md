# Testing

> I am not happy with this page right now.

There are many different names and people use different names to mean different
things. The following will likely not confirm to what you think:

Tests can be divided by size:

* unit-tests - tiny, no IO, no other components involved \(small\) - fast
* integration tests - test combined units \(medium-large\) - slow
* system tests - test multiple high-level stages \(large\) - slow

They can be divided by methodology:

* functional tests - functional programming, test output based on input \(NB: also used to refer to testing features\)
* acceptance tests - the final end result \(black-box\) tested at the highest, outer-most level \(e.g. using your web app with a web browser\)

They can be divided by purpose:

* smoke tests - a subset of tests that quickly reveal severe failures
* regression tests - tests that catch bugs that come back, or features that stop working

They can be divided by who is doing them:

* end-to-end tests - performed by QA involving multiple distinct steps to accomplish a goal
* user acceptance tests - performed by non-technical business users or otherwise domain-experts to test whether they accept the software in their heart

Tests accomplish two main goals:

* What you've written now is right, including incorporating business requirement directly as a test.
* What you've written stays right, including refactoring with confidence (increase development speed; reduce regressions). It leaves a bad impression \(on clients\) if a bug keeps reappearing, and demoralises developers.

Software Quality Assurance (SQA) looks at the development process itself to reduce the number of issues.

You also have operation acceptance tests, which test things like failover, backups, recoveries, performance, monitoring, and alerting.

## Principles

* The tests can help guide you towards a nice API, e.g. write the final candidate API with its integration tests and write the lower level details to advance the integration test as needed with unit-tests alongside it. i.e. Write what a thing is supposed to do
* Found a bug? Write a test that verifies it, then fix it. \(Usually.\)
* Arrange-Act-Assert \(AAA\): set up the test, execute your code, check against expected results. I usually do Arrange-Assert-Act-Assert.
  * This is also known as Given-When-Then in Behaviour-Driven Development \(BDD\) which uses the friendly english language to express the requirements.

## Automated Code Review

Who? The machine runs it for everyone

What?

* Static code analysis
* Data-flow analysis?
* Code coverage

When?

* Git pre-commit hook
* Local \(manual run\)
* Code review interface
* Continuous Integration \(merger\) runner

## How to Mock

Don't. Ref: [https://www.youtube.com/watch?v=Xu5EhKVZdV8](https://www.youtube.com/watch?v=Xu5EhKVZdV8)

https://www.youtube.com/watch?v=3MNVP9-hglc "The End Of Object Inheritance & The Beginning Of A New Modularity" here?

How to Test: [https://www.destroyallsoftware.com/talks/boundaries](https://www.destroyallsoftware.com/talks/boundaries)

Imperative shell = integration tests of the shell which tie together all the dependencies \(no logic; no code paths to test\) - that's what they're good at.

Functional core = unit-tests of all that messy logic \(that's what they're good at\)

## Test Doubles

<https://scribe.rip/m/global-identity-2?redirectUrl=https%3A%2F%2Fblog.pragmatists.com%2Ftest-doubles-fakes-mocks-and-stubs-1a7491dfa3da>

* Dummy — anything not used
* Fakes — working implementation with shortcuts (test for state)
* Stubs — answers queries with predefined data
* Spies — stubs that record how they were called
* Mocks — verify calls against a specification (test for behaviour)

### How to choose between these?

There's different schools:

* <https://scribe.rip/@adrianbooth/test-driven-development-wars-detroit-vs-london-classicist-vs-mockist-9956c78ae95f>
* <https://martinfowler.com/articles/mocksArentStubs.html>
* <https://tyrrrz.me/blog/fakes-over-mocks>

Don't use test doubles for what you own. Only mock/fake external dependencies.

You own your own database, so you can use the real thing for tests.

You don't own a 3rd party API, so you need to use a fake for it (or mock it).

“Mocking introduces assumptions, which introduces risk”. You are assuming the client library is implemented right, you are assuming all boundaries are solid, you are assuming you know how the library actually behaves.


### More ideas

<https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks>
