# Testing

Tests can be divided by size:

* unit-tests - tiny, no IO, no other components involved \(small\) - fast
* integration tests - test combined units \(medium-large\) - slow

They can be divided by methodology:

* functional tests - functional programming, test output based on input
* acceptance tests - the final end result tested at the highest, outer-most level \(e.g. using your web app with a web browser\)

They can be divided by who is doing them:

* end-to-end tests - performed by QA involving multiple distinct steps to accomplish a goal
* user acceptance tests - performed by non-technical business users or otherwise domain-experts to test whether the user accepts the software in their heart

But really, it's all fuzzy so don't worry about it.

Tests accomplish two main goals:

* What you've written now is right, including incorporating business requirement directly as a test
* What you've written stays right, including allow refactorings with confidence \(increase development speed; reduce regressions\). It leaves a bad impression on \(clients\) if a bug keeps reappearing.

## Principles

* The tests can help guide you towards a nice API, e.g. write the final candidate API with its integration tests and write the lower level details to advance the integration test as needed with unit-tests alongside it. i.e. Write what a thing is supposed to do
* Found a bug? Write a test that verifies it, then fix it. \(Usually.\)

## How to Mock

Ref: [https://www.youtube.com/watch?v=Xu5EhKVZdV8](https://www.youtube.com/watch?v=Xu5EhKVZdV8)

