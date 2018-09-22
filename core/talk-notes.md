# Talk Notes

* [The Clean Architecture in Python](https://www.youtube.com/watch?v=DJtef410XaM) - Brandon Rhodes PyOhio 2014

  * A soft introduction to domain-driven development, imperative shell/functional core
  * Burying I/O into a sub-procedure hides the complexity of the procedure
  * Decoupling I/O _above your procedure_ simplifies the implementation, allows for easier unit-testing, better composability
  * The latter decouples the I/O, the former
  * Comments are information that can be moved into the code itself \(self-documenting\)
  * Two methods of avoiding decoupled I/O: dependency injection and mocking
  * Dependency injection \(2004 Martin Fowler: make the I/O library or function a parameter\) leads to DI frameworks because all the dependencies need to be injected all the way down into the very depths of your code \(they could use anything they want\). The paramters just need to be passed along.
  * The other problem with DI for testing is that you are not testing the real library
  * Mock is similar.
  * DI/mock make you feel that you are fighting the structure of your program? Code smell.
  * A symptom of coupling - testing combinations of parameters
  * In DDD the deeper you go into a program, the closer to policies you should get. The shell should be mechanisms.
  * Isolated, simple data structures are passed across boundaries.
  * "An imperative shell, that wraps and uses, your functional core"
  * Procedural code: "output as you run"; functional code: stages producing data, that outputs at the end.
  * The biggest advantage of functional programming is that you can _see the data_ between stages. "Show code and hide models and I will be mystified; show models and hide code and it will be obvious"
  * By working in stages - linking simple programs together - you can picture the output of each stage. It continually surfaces the result which can be easily checked. **Our minds can picture the data easily.**
  * "The coder can concentrate on one section of the program at a time, without the overall detailed program continually intruding"
  * Immutable data structures lead to distributed computing: if you modify memory, you cannot move that code to another machine, but if you just accept data and return data then you can move that to another machine.
  * A function that takes an opaque, complex data structure is actually a disguised method.
  * Brief Python-specific details at the very end \(generators, iterators, context managers\).



