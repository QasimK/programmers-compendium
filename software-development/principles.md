# Principles

These guiding principles reduce bugs and increase implementation speed of new features or modifications.

Remember the scope and context of the project. Is it a script? Is it huge? Is it one-off? Is it mission-critical?

## YAGNI/KISS

_You aren't gonna need it_/_keep it simple stupid_ tells you _when_ to do something. The other principles tell you _how_ to do something.

## SOLID

[SOLID](https://wayback.archive.org/web/20170204020312/https://lostechies.com/derickbailey/2009/02/11/solid-development-principles-in-motivational-pictures/) applies to object-orientated programming.

* Single Responsibility Principle
  * Domain-dependent
  * Think about who - the role - that will be causing what changes and isolate that code together
  * Higher cohesion \(object has greater focus\)
  * Lower coupling \(object does not connect to or require knowledge of other object\)
* Open/Closed Principle
  * "An object should be open for extension, but closed for modification"
  * This means the design should facilitate new functionality or changes in requirements without modifying existing code
  * The object becoming closed means it now has a well-defined interface and may be used by others
  * This limits the risk of introducing bugs into already developed & tested code
  * In a dynamic language it also means you don't dynamically reach into and modify an object
  * Violation smells: switch/if-else statements that can be extended
  * Implementation notes: use abstraction and interfaces
  * Be aware: Pure inheritance introduces coupling if subclasses depend on implementation details of their parent class.
  * When to use: You cannot predict the future so "modifications may be done once, maybe twice, but not thrice before I used OCP"
* Liskov Substitution Principle
  * "A _type_ may be replaced by its _sub-types_ without causing any harm to the program"
  * Otherwise [your method must alter its behaviour](https://softwareengineering.stackexchange.com/questions/170222/what-can-go-wrong-if-the-liskov-substitution-principle-is-violated) by investigating the type of object its been given
  * It [works slightly differently in dynamic languages](https://stefanroock.wordpress.com/2010/11/08/the-liskov-substitution-principle-lsp-in-duck-typed-programming-languages/).
* Interface Segregation Principle
  * ???
* Dependency Inversion Principle
  * ???

## Composition over Inheritance

Starting point: [https://www.youtube.com/watch?v=3MNVP9-hglc](https://www.youtube.com/watch?v=3MNVP9-hglc)

Inheritance is difficult with Liskov's substitution principle anyway.

## Law of Demeter

The _principle of least knowledge_, in particular for OOD, says to loosely couple the design by having objects only talk to their immediate "friends".

Code Smell: `self.friend.internal_variable.dobla()`

Better: `self.friend.dobla()`

## Tech Debt

TBD: https://engineering.riotgames.com/news/taxonomy-tech-debt



