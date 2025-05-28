// js/quizzes/humor_quiz.js
const humorQuiz = {
    "info": {
        "name": "Humor Quiz",
        "main": "<p>Test your sense of humor with these witty questions!</p>"
    },
    "questions": [
        {
            "q": "Why don't scientists trust atoms?",
            "a": [
                {"option": "They're too small", "correct": false},
                {"option": "They make up everything", "correct": true},
                {"option": "They're always positive", "correct": false},
                {"option": "They have too much energy", "correct": false}
            ],
            "correct": "<p><span>Haha!</span> Because they make up everything!</p>",
            "incorrect": "<p><span>Nope!</span> The answer is: Because they make up everything!</p>"
        },
        {
            "q": "What do you call a fish with no eyes?",
            "a": [
                {"option": "Blind fish", "correct": false},
                {"option": "Fsh", "correct": true},
                {"option": "No-see fish", "correct": false},
                {"option": "Dark fish", "correct": false}
            ],
            "correct": "<p><span>Gotcha!</span> Fsh!</p>",
            "incorrect": "<p><span>Missed it!</span> It's 'fsh' (no 'i').</p>"
        },
              {
            "q": "What is the primary difference between `HashMap` and `ConcurrentHashMap` in Java?",
            "a": [
                {"option": "`HashMap` is synchronized, while `ConcurrentHashMap` is not.", "correct": false},
                {"option": "`ConcurrentHashMap` uses a single lock for all operations, while `HashMap` does not.", "correct": false},
                {"option": "`ConcurrentHashMap` allows concurrent read and write operations with better performance by using segmented locking or lock striping, while `HashMap` is not thread-safe.", "correct": true},
                {"option": "`HashMap` maintains insertion order, while `ConcurrentHashMap` does not.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `ConcurrentHashMap` is designed for concurrent access and provides higher throughput by dividing the map into segments, each with its own lock, or using more advanced techniques in later Java versions. `HashMap` is not thread-safe and can lead to issues in multi-threaded environments without external synchronization.</p>",
            "incorrect": "<p><span>Incorrect.</span> `ConcurrentHashMap` is specifically designed for thread-safe concurrent operations with better performance than a synchronized `HashMap`.</p>"
        },
        {
            "q": "Explain the concept of Java Memory Model (JMM) and its importance.",
            "a": [
                {"option": "JMM defines how Java programs manage heap memory allocation and garbage collection.", "correct": false},
                {"option": "JMM specifies the behavior of threads and their interaction with memory, ensuring visibility and ordering of operations across threads.", "correct": true},
                {"option": "JMM is a tool for profiling memory usage in Java applications.", "correct": false},
                {"option": "JMM primarily deals with stack memory and method call execution.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The Java Memory Model (JMM) defines the rules that govern how threads interact through memory. It ensures that changes made by one thread are visible to other threads and that operations are ordered correctly, which is crucial for writing correct concurrent programs.</p>",
            "incorrect": "<p><span>Incorrect.</span> The JMM is fundamental for understanding and writing correct multi-threaded Java applications, as it deals with visibility, atomicity, and ordering guarantees.</p>"
        },
        {
            "q": "What are lambda expressions in Java 8, and what problem do they solve?",
            "a": [
                {"option": "Lambda expressions are a new type of loop construct for iterating collections.", "correct": false},
                {"option": "Lambda expressions provide a concise way to represent anonymous functions, primarily used to implement functional interfaces and simplify event handling or callbacks.", "correct": true},
                {"option": "Lambda expressions are used for defining custom annotations.", "correct": false},
                {"option": "Lambda expressions are a replacement for the `switch` statement.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Lambda expressions enable functional programming paradigms in Java, allowing for more concise and readable code, especially when working with collections (Streams API) and implementing interfaces with a single abstract method (functional interfaces).</p>",
            "incorrect": "<p><span>Incorrect.</span> Lambda expressions are a key feature of Java 8 that provides a compact syntax for representing anonymous functions.</p>"
        },
        {
            "q": "What is the difference between `String`, `StringBuilder`, and `StringBuffer` in Java?",
            "a": [
                {"option": "`String` is mutable, `StringBuilder` and `StringBuffer` are immutable.", "correct": false},
                {"option": "`String` is immutable, `StringBuilder` is mutable and not thread-safe, `StringBuffer` is mutable and thread-safe.", "correct": true},
                {"option": "All three are mutable, but `StringBuffer` is faster.", "correct": false},
                {"option": "`String` and `StringBuilder` are thread-safe, `StringBuffer` is not.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `String` objects are immutable. `StringBuilder` provides a mutable sequence of characters and is not synchronized (not thread-safe), making it faster for single-threaded scenarios. `StringBuffer` is also mutable but is synchronized (thread-safe), which can incur a performance overhead.</p>",
            "incorrect": "<p><span>Incorrect.</span> The key differences lie in mutability and thread-safety. Choose `StringBuilder` for most cases unless thread-safety for string manipulations is explicitly required, then use `StringBuffer`.</p>"
        },

        // Spring Framework
        {
            "q": "What is Dependency Injection (DI) in Spring?",
            "a": [
                {"option": "A design pattern where objects define their dependencies externally and are provided with them rather than creating them internally.", "correct": true},
                {"option": "A way to inject SQL dependencies into Java code.", "correct": false},
                {"option": "A mechanism for Spring to automatically download project dependencies from Maven.", "correct": false},
                {"option": "A feature for injecting JavaScript code into Spring MVC views.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Dependency Injection is a core principle of the Spring Framework. It promotes loose coupling by allowing objects to receive their dependencies from an external source (the Spring IoC container) instead of creating them directly.</p>",
            "incorrect": "<p><span>Incorrect.</span> DI is about how objects obtain their dependencies, making the system more modular and easier to test.</p>"
        },
        {
            "q": "What is the role of `@SpringBootApplication` annotation?",
            "a": [
                {"option": "It's used to define a Spring MVC controller.", "correct": false},
                {"option": "It's a convenience annotation that combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`.", "correct": true},
                {"option": "It's used to configure database connections in Spring Boot.", "correct": false},
                {"option": "It enables Spring Security for the application.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `@SpringBootApplication` is a meta-annotation that marks the main class of a Spring Boot application. It enables auto-configuration, component scanning, and allows registering extra beans in the context or importing additional configuration classes.</p>",
            "incorrect": "<p><span>Incorrect.</span> `@SpringBootApplication` simplifies the setup of a Spring Boot application by combining three commonly used annotations.</p>"
        },
        {
            "q": "Explain the difference between `@Component`, `@Service`, `@Repository`, and `@Controller` annotations in Spring.",
            "a": [
                {"option": "They are all identical and can be used interchangeably.", "correct": false},
                {"option": "`@Component` is a generic stereotype for any Spring-managed component. `@Service` is for service layer beans, `@Repository` for DAO/persistence layer beans (providing exception translation), and `@Controller` for MVC controllers.", "correct": true},
                {"option": "`@Service` and `@Repository` are used for REST controllers, while `@Component` is for background tasks.", "correct": false},
                {"option": "Only `@Controller` creates beans in the Spring container; the others are for documentation.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> While all these annotations mark classes as Spring beans, they also convey semantic meaning about the layer or role of the component. `@Repository` additionally enables Spring's Data Access Exception translation.</p>",
            "incorrect": "<p><span>Incorrect.</span> These stereotype annotations help in organizing the application architecture and provide specific functionalities (like exception translation for `@Repository`).</p>"
        },
        {
            "q": "What is Spring AOP (Aspect-Oriented Programming)? Give an example of its use.",
            "a": [
                {"option": "AOP is used for creating web services in Spring.", "correct": false},
                {"option": "AOP allows modularization of cross-cutting concerns (e.g., logging, security, transactions) by defining aspects that are woven into the code at specified points (join points).", "correct": true},
                {"option": "AOP is Spring's way of managing asynchronous operations.", "correct": false},
                {"option": "AOP is a replacement for Object-Oriented Programming in Spring.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> AOP helps to separate concerns that affect multiple parts of an application. For example, declarative transaction management (`@Transactional`) is a common use case of AOP in Spring, where transaction logic is applied to methods without cluttering the business logic.</p>",
            "incorrect": "<p><span>Incorrect.</span> AOP is a powerful paradigm for handling cross-cutting concerns in a clean and modular way.</p>"
        },
        {
            "q": "How does Spring Boot's auto-configuration work?",
            "a": [
                {"option": "It scans all classes in the project and configures them automatically.", "correct": false},
                {"option": "It relies on developers to manually configure all beans in XML files.", "correct": false},
                {"option": "Spring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies that you have added. For example, if `HSQLDB` is on your classpath, and you have not manually configured any database connection beans, then Spring Boot auto-configures an in-memory database.", "correct": true},
                {"option": "It only works for web applications and configures Tomcat by default.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Auto-configuration is a key feature of Spring Boot that simplifies setup. It looks for specific classes in the classpath and, if found, provides default configurations for them, which can be overridden by the developer if needed.</p>",
            "incorrect": "<p><span>Incorrect.</span> Auto-configuration intelligently sets up beans based on classpath dependencies and existing configurations, reducing boilerplate.</p>"
        },
        {
            "q": "What is the purpose of Spring Security?",
            "a": [
                {"option": "To secure database connections.", "correct": false},
                {"option": "To provide authentication and authorization features for Java applications.", "correct": true},
                {"option": "To encrypt data stored in configuration files.", "correct": false},
                {"option": "To manage security certificates for HTTPS.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Spring Security is a powerful and highly customizable framework that provides comprehensive security services, including authentication (who you are) and authorization (what you are allowed to do), for Java applications, particularly web applications.</p>",
            "incorrect": "<p><span>Incorrect.</span> Spring Security is the de-facto standard for securing Spring-based applications.</p>"
        },

        // Hibernate/JPA
        {
            "q": "What is JPA (Java Persistence API)?",
            "a": [
                {"option": "A specific ORM tool developed by Oracle.", "correct": false},
                {"option": "A Java specification that describes the management of relational data in applications using Java Platform, Standard Edition and Java Platform, Enterprise Edition. It provides a standard way to perform ORM.", "correct": true},
                {"option": "A library for creating RESTful APIs in Java.", "correct": false},
                {"option": "A templating engine for Java web applications.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> JPA is a specification, not an implementation. ORM tools like Hibernate, EclipseLink, and OpenJPA implement the JPA specification, allowing developers to work with databases using object-oriented paradigms.</p>",
            "incorrect": "<p><span>Incorrect.</span> JPA provides a standard API for object-relational mapping, promoting portability across different ORM providers.</p>"
        },
        {
            "q": "Explain the difference between eager and lazy loading in Hibernate/JPA.",
            "a": [
                {"option": "Eager loading loads all associated entities immediately, while lazy loading loads them only when they are accessed.", "correct": true},
                {"option": "Lazy loading is faster but less reliable than eager loading.", "correct": false},
                {"option": "Eager loading is only for ToOne relationships, and lazy loading is for ToMany relationships.", "correct": false},
                {"option": "There is no difference; they are synonyms.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Eager loading can lead to fetching more data than necessary (N+1 problem if not handled carefully), while lazy loading can lead to `LazyInitializationException` if an association is accessed outside of an active session. Choosing the right strategy depends on the use case.</p>",
            "incorrect": "<p><span>Incorrect.</span> Eager loading fetches related data immediately with the main entity, while lazy loading defers fetching until the related data is explicitly accessed.</p>"
        },
        {
            "q": "What is the N+1 selects problem in ORM, and how can it be mitigated?",
            "a": [
                {"option": "It's a problem where N+1 database connections are opened.", "correct": false},
                {"option": "It occurs when an ORM executes one query to retrieve the parent entities and then N additional queries to retrieve the related child entities for each parent, leading to performance issues. It can be mitigated using eager fetching (e.g., JOIN FETCH) or batch fetching.", "correct": true},
                {"option": "It refers to N+1 security vulnerabilities in an application.", "correct": false},
                {"option": "It's a problem related to transaction management where N+1 transactions are started.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The N+1 selects problem is a common performance pitfall in ORM. Strategies like using `JOIN FETCH` in JPQL/HQL, entity graphs, or batch fetching can help retrieve related data more efficiently in fewer queries.</p>",
            "incorrect": "<p><span>Incorrect.</span> The N+1 problem arises from inefficiently fetching collections or related entities, resulting in many separate database queries.</p>"
        },
        {
            "q": "What are Cascade Types in JPA/Hibernate (e.g., `CascadeType.PERSIST`, `CascadeType.MERGE`)?",
            "a": [
                {"option": "They define how database schema changes are cascaded.", "correct": false},
                {"option": "They specify how persistence operations on a parent entity should propagate to its associated child entities.", "correct": true},
                {"option": "They control the transaction isolation levels.", "correct": false},
                {"option": "They are used for cascading style sheets in web UIs.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Cascade types (e.g., ALL, PERSIST, MERGE, REMOVE, REFRESH, DETACH) define whether operations performed on a parent entity should be automatically applied to its related child entities. For example, `CascadeType.PERSIST` means if the parent is persisted, associated new children are also persisted.</p>",
            "incorrect": "<p><span>Incorrect.</span> Cascade types are crucial for managing the lifecycle of related entities in JPA/Hibernate.</p>"
        },

        // Databases (SQL, NoSQL)
        {
            "q": "What are database indexes, and why are they important?",
            "a": [
                {"option": "Indexes are backups of database tables.", "correct": false},
                {"option": "Indexes are special lookup tables that the database search engine can use to speed up data retrieval. They are important for improving query performance but can slow down write operations.", "correct": true},
                {"option": "Indexes are used to enforce data encryption.", "correct": false},
                {"option": "Indexes are constraints that ensure data uniqueness.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Indexes work like an index in a book, allowing the database to find rows with specific column values quickly without scanning the entire table. While they speed up reads, they add overhead to writes (INSERT, UPDATE, DELETE) as the indexes also need to be updated.</p>",
            "incorrect": "<p><span>Incorrect.</span> Indexes are crucial for optimizing database query performance by enabling faster data lookups.</p>"
        },
        {
            "q": "Explain ACID properties in the context of database transactions.",
            "a": [
                {"option": "Atomicity, Consistency, Isolation, Durability. These properties guarantee that database transactions are processed reliably.", "correct": true},
                {"option": "Availability, Concurrency, Integrity, Distribution.", "correct": false},
                {"option": "Authentication, Authorization, Confidentiality, Integrity.", "correct": false},
                {"option": "Association, Classification, Indexing, Discovery.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> ACID properties are: <b>Atomicity</b> (all changes to data are performed as if they are a single operation), <b>Consistency</b> (data is in a consistent state when a transaction starts and when it ends), <b>Isolation</b> (the intermediate state of a transaction is invisible to other transactions), and <b>Durability</b> (after a transaction successfully completes, changes to data persist even in the event of a system failure).</p>",
            "incorrect": "<p><span>Incorrect.</span> ACID properties are fundamental to ensure reliability and integrity in transactional database systems.</p>"
        },
        {
            "q": "What is the difference between SQL and NoSQL databases? Provide an example of when to use each.",
            "a": [
                {"option": "SQL databases are schema-less, NoSQL databases have rigid schemas.", "correct": false},
                {"option": "SQL databases are relational (e.g., MySQL, PostgreSQL) and typically use structured query language. NoSQL databases are non-relational (e.g., MongoDB, Cassandra) and offer flexible schemas. Use SQL for applications requiring strong consistency and complex transactions (e.g., banking). Use NoSQL for large-scale data with flexible schemas and high availability needs (e.g., social media feeds).", "correct": true},
                {"option": "SQL databases are only for small applications, NoSQL for large ones.", "correct": false},
                {"option": "NoSQL databases do not support queries.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> SQL databases are generally vertically scalable and enforce ACID properties strictly. NoSQL databases often prioritize horizontal scalability, performance, and flexibility, sometimes offering eventual consistency (BASE properties).</p>",
            "incorrect": "<p><span>Incorrect.</span> The choice between SQL and NoSQL depends on factors like data model, scalability requirements, consistency needs, and query patterns.</p>"
        },
        {
            "q": "What is denormalization in database design, and why might it be used?",
            "a": [
                {"option": "It's the process of adding more tables to a normalized database.", "correct": false},
                {"option": "It's the process of intentionally introducing redundancy into a relational database by adding data from one table to another. It's used to improve read performance by reducing the need for complex joins, at the cost of increased write complexity and data redundancy.", "correct": true},
                {"option": "It's a technique to encrypt sensitive data in the database.", "correct": false},
                {"option": "It's the process of removing all indexes from a database.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Denormalization is often applied in data warehousing or reporting databases where read speed is critical. It's a trade-off: faster reads for potentially slower writes and increased storage, plus the risk of data inconsistencies if not managed carefully.</p>",
            "incorrect": "<p><span>Incorrect.</span> Denormalization is a strategy to optimize read performance by adding redundant data, thereby avoiding costly joins.</p>"
        },

        // RESTful APIs & Microservices
        {
            "q": "What are the key principles of REST (Representational State Transfer)?",
            "a": [
                {"option": "Stateful communication, XML-only data format, tight coupling.", "correct": false},
                {"option": "Client-Server architecture, Statelessness, Cacheability, Layered System, Uniform Interface, Code on Demand (optional).", "correct": true},
                {"option": "SOAP-based messaging, WSDL for service description.", "correct": false},
                {"option": "RPC-style interactions, binary data formats.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> These principles guide the design of scalable, maintainable, and evolvable web services. Statelessness, for example, means each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server.</p>",
            "incorrect": "<p><span>Incorrect.</span> REST principles define an architectural style for building distributed systems, emphasizing scalability and simplicity.</p>"
        },
        {
            "q": "What are common HTTP methods used in REST APIs and their typical use cases?",
            "a": [
                {"option": "GET (create), POST (retrieve), PUT (delete), DELETE (update).", "correct": false},
                {"option": "GET (retrieve data), POST (create new data), PUT (update existing data or create if not exists), DELETE (remove data), PATCH (partially update existing data).", "correct": true},
                {"option": "SEND (send data), RECEIVE (get data), MODIFY (change data).", "correct": false},
                {"option": "All operations are done using the POST method for security.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> These HTTP methods (verbs) map to CRUD (Create, Read, Update, Delete) operations on resources. Idempotency is also an important concept (e.g., GET, PUT, DELETE are typically idempotent, POST is not).</p>",
            "incorrect": "<p><span>Incorrect.</span> Understanding the semantics of HTTP methods is crucial for designing proper RESTful APIs.</p>"
        },
        {
            "q": "What is Idempotency in the context of HTTP methods?",
            "a": [
                {"option": "An idempotent operation can be performed multiple times with the same effect as if it were performed only once.", "correct": true},
                {"option": "It means the operation is executed very quickly.", "correct": false},
                {"option": "It means the operation can only be performed once.", "correct": false},
                {"option": "It refers to the security level of the HTTP method.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> For example, a `DELETE /users/123` request, if successful, deletes user 123. Subsequent identical `DELETE` requests should still result in user 123 being (or remaining) deleted, without further side effects like erroring because the user is already gone. `GET`, `PUT`, and `DELETE` are typically idempotent. `POST` is generally not.</p>",
            "incorrect": "<p><span>Incorrect.</span> Idempotency is important for designing robust and fault-tolerant APIs, especially in distributed systems where requests might be retried.</p>"
        },
        {
            "q": "What are microservices, and what are their advantages and disadvantages compared to monolithic architectures?",
            "a": [
                {"option": "Microservices are small, independent UI components.", "correct": false},
                {"option": "Microservices architecture is an approach where a large application is built as a suite of small, independently deployable services. Advantages: technology diversity, resilience, scalability, easier maintenance. Disadvantages: operational complexity, distributed system challenges (latency, consistency), testing complexity.", "correct": true},
                {"option": "Microservices are always faster and cheaper to develop than monoliths.", "correct": false},
                {"option": "Monolithic architectures are outdated and should never be used.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Microservices offer benefits like independent scaling and deployment of services, and technology flexibility. However, they introduce complexities related to inter-service communication, distributed transactions, monitoring, and deployment orchestration.</p>",
            "incorrect": "<p><span>Incorrect.</span> Microservices represent an architectural style that structures an application as a collection of loosely coupled, independently deployable services.</p>"
        },
        {
            "q": "What is a Service Discovery mechanism in a microservices architecture (e.g., Eureka, Consul)?",
            "a": [
                {"option": "A tool for discovering security vulnerabilities in services.", "correct": false},
                {"option": "A way for services to dynamically find the network locations (IP address and port) of other services they need to communicate with.", "correct": true},
                {"option": "A logging service for microservices.", "correct": false},
                {"option": "A version control system for microservice code.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> In a dynamic microservices environment where instances can scale up/down or change locations, service discovery is crucial. Services register themselves with a discovery server, and other services query this server to find them.</p>",
            "incorrect": "<p><span>Incorrect.</span> Service discovery is essential for enabling communication between microservices in a dynamic environment.</p>"
        },
        {
            "q": "What is an API Gateway, and what role does it play in a microservices architecture?",
            "a": [
                {"option": "A database gateway for microservices.", "correct": false},
                {"option": "A single entry point for all client requests to the microservices backend. It can handle concerns like request routing, composition, authentication, rate limiting, and SSL termination.", "correct": true},
                {"option": "A tool for monitoring API performance.", "correct": false},
                {"option": "A message broker for asynchronous communication between services.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> An API Gateway simplifies client interaction with a microservices backend by providing a unified interface and offloading common concerns from individual services.</p>",
            "incorrect": "<p><span>Incorrect.</span> The API Gateway pattern is a common and effective way to manage access to microservices from external clients.</p>"
        },

        // Frontend Technologies (Conceptual)
        {
            "q": "What is the difference between `null` and `undefined` in JavaScript?",
            "a": [
                {"option": "They are identical.", "correct": false},
                {"option": "`undefined` means a variable has been declared but not yet assigned a value. `null` is an assignment value, meaning it has no value or is explicitly empty.", "correct": true},
                {"option": "`null` means an error occurred, `undefined` means the variable doesn't exist.", "correct": false},
                {"option": "`undefined` is for objects, `null` is for primitive types.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `undefined` is typically the default value of uninitialized variables, function parameters not passed, or object properties that don't exist. `null` is intentionally assigned to indicate that a variable should have no value.</p>",
            "incorrect": "<p><span>Incorrect.</span> Understanding this distinction is fundamental in JavaScript. `typeof undefined` is 'undefined', while `typeof null` is 'object' (a historical quirk).</p>"
        },
        {
            "q": "What is the Document Object Model (DOM)?",
            "a": [
                {"option": "A model for documenting JavaScript code.", "correct": false},
                {"option": "A programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.", "correct": true},
                {"option": "A type of database used in web browsers.", "correct": false},
                {"option": "A security model for web applications.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The DOM represents the document as a tree of objects (nodes), allowing scripts to dynamically interact with and modify the content and structure of a web page.</p>",
            "incorrect": "<p><span>Incorrect.</span> The DOM is crucial for dynamic web page manipulation using JavaScript.</p>"
        },
        {
            "q": "Briefly explain the concept of Promises in JavaScript.",
            "a": [
                {"option": "Promises are a way to declare variables that will hold a value in the future.", "correct": false},
                {"option": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It helps manage asynchronous code more cleanly than traditional callbacks.", "correct": true},
                {"option": "Promises are used for encrypting data in JavaScript.", "correct": false},
                {"option": "Promises are a feature for creating UI animations.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Promises can be in one of three states: pending, fulfilled (resolved), or rejected. They allow chaining of asynchronous operations and better error handling (e.g., using `.then()` and `.catch()`).</p>",
            "incorrect": "<p><span>Incorrect.</span> Promises are a fundamental tool for handling asynchronous operations in modern JavaScript, avoiding 'callback hell'.</p>"
        },
        {
            "q": "What is CORS (Cross-Origin Resource Sharing) and why is it needed?",
            "a": [
                {"option": "A JavaScript framework for building UIs.", "correct": false},
                {"option": "A security mechanism implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. It's needed to prevent malicious websites from accessing sensitive data on other sites.", "correct": true},
                {"option": "A CSS preprocessor.", "correct": false},
                {"option": "A tool for compressing web assets.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> By default, browsers enforce the Same-Origin Policy. CORS allows servers to specify which other origins are permitted to access their resources, typically via HTTP headers like `Access-Control-Allow-Origin`.</p>",
            "incorrect": "<p><span>Incorrect.</span> CORS is a browser security feature that controls how web pages in one domain can request resources from another domain.</p>"
        },

        // Build Tools & DevOps
        {
            "q": "What is Maven, and what are its main benefits?",
            "a": [
                {"option": "A continuous integration server.", "correct": false},
                {"option": "A build automation tool primarily used for Java projects. Benefits include dependency management, standardized project structure, build lifecycle management, and plugin ecosystem.", "correct": true},
                {"option": "A version control system similar to Git.", "correct": false},
                {"option": "A code editor for Java.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Maven simplifies the build process by using a Project Object Model (POM) file (`pom.xml`) to define project dependencies, build plugins, and other configurations. It promotes convention over configuration.</p>",
            "incorrect": "<p><span>Incorrect.</span> Maven is a powerful tool for managing the build lifecycle and dependencies of Java projects.</p>"
        },
        {
            "q": "What is the purpose of a `pom.xml` file in a Maven project?",
            "a": [
                {"option": "It contains the Java source code for the project.", "correct": false},
                {"option": "It is the Project Object Model file that contains project configuration details, such as dependencies, plugins, build profiles, project version, etc.", "correct": true},
                {"option": "It's a script for deploying the application to a server.", "correct": false},
                {"option": "It stores user credentials for accessing Maven repositories.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The `pom.xml` is the heart of a Maven project. It defines all aspects of the project build and management.</p>",
            "incorrect": "<p><span>Incorrect.</span> The `pom.xml` is the core configuration file for any Maven project.</p>"
        },
        {
            "q": "What is Git, and how does it differ from centralized version control systems (e.g., SVN)?",
            "a": [
                {"option": "Git is a build tool, while SVN is for version control.", "correct": false},
                {"option": "Git is a distributed version control system (DVCS), meaning every developer has a full copy of the repository, including its history. This allows for offline work, faster branching/merging, and no single point of failure. Centralized systems (like SVN) have a single central repository.", "correct": true},
                {"option": "Git can only be used for open-source projects.", "correct": false},
                {"option": "SVN is newer and more advanced than Git.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Git's distributed nature offers significant advantages in terms of speed, flexibility, and offline capabilities compared to centralized VCS like Subversion.</p>",
            "incorrect": "<p><span>Incorrect.</span> Git is a DVCS, which is a key differentiator from systems like SVN, offering more robust and flexible version control.</p>"
        },
        {
            "q": "What is Docker, and what problems does it solve?",
            "a": [
                {"option": "A virtual machine hypervisor like VirtualBox.", "correct": false},
                {"option": "A platform for developing, shipping, and running applications in containers. It solves the \"it works on my machine\" problem by packaging an application with all its dependencies into a standardized unit (container) that can run consistently across different environments.", "correct": true},
                {"option": "A cloud storage service.", "correct": false},
                {"option": "A project management tool.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Docker containers are lightweight, portable, and provide process isolation, making it easier to build, test, and deploy applications consistently.</p>",
            "incorrect": "<p><span>Incorrect.</span> Docker utilizes OS-level virtualization to create isolated environments called containers, ensuring consistency from development to production.</p>"
        },
        {
            "q": "What is CI/CD (Continuous Integration/Continuous Delivery/Deployment)?",
            "a": [
                {"option": "A software development methodology focused on pair programming.", "correct": false},
                {"option": "A set of practices where developers regularly merge their code changes into a central repository (CI), after which automated builds and tests are run. CD extends this by automatically deploying all code changes to a testing and/or production environment after the build stage.", "correct": true},
                {"option": "A type of database management system.", "correct": false},
                {"option": "A specific programming language for automation.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> CI/CD pipelines automate the software delivery process, enabling faster and more reliable releases, improved code quality, and reduced manual effort.</p>",
            "incorrect": "<p><span>Incorrect.</span> CI/CD is a crucial DevOps practice for automating the build, test, and deployment lifecycle of software.</p>"
        },

        // Data Structures & Algorithms (Common OA questions)
        {
            "q": "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
            "a": [
                {"option": "O(1)", "correct": false},
                {"option": "O(log n)", "correct": true},
                {"option": "O(n)", "correct": false},
                {"option": "O(n log n)", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> In a balanced BST, the height of the tree is O(log n). Since search operations traverse from the root to a leaf, the time complexity is proportional to the height.</p>",
            "incorrect": "<p><span>Incorrect.</span> For a balanced BST, search, insert, and delete operations typically have a time complexity of O(log n). In the worst case (unbalanced tree), it can degrade to O(n).</p>"
        },
        {
            "q": "Explain the difference between an Array and a Linked List.",
            "a": [
                {"option": "Arrays can only store numbers, Linked Lists can store any data type.", "correct": false},
                {"option": "Arrays store elements in contiguous memory locations, allowing O(1) access by index. Linked Lists store elements non-contiguously using pointers, allowing O(1) insertion/deletion at ends (or with a direct pointer) but O(n) access by index.", "correct": true},
                {"option": "Linked Lists are always faster than Arrays.", "correct": false},
                {"option": "Arrays are dynamic in size, Linked Lists are fixed.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Arrays offer fast random access but slow insertion/deletion in the middle. Linked Lists offer fast insertion/deletion (if the node is known) but slow random access. Memory allocation also differs; arrays need a contiguous block, while linked list nodes can be scattered.</p>",
            "incorrect": "<p><span>Incorrect.</span> The choice depends on the operations frequently performed. Arrays excel at random access, while linked lists excel at insertions and deletions.</p>"
        },
        {
            "q": "How would you reverse a string in Java efficiently without using built-in reverse functions?",
            "a": [
                {"option": "Iterate from the end and append to a new string.", "correct": false}, // Correct, but less efficient due to string concatenation
                {"option": "Convert to a char array, swap elements from both ends moving inwards. Or use a StringBuilder and append characters in reverse order.", "correct": true},
                {"option": "Use recursion to print characters in reverse.", "correct": false}, // Prints, doesn't return a reversed string efficiently
                {"option": "It's not possible without built-in functions.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Using a `StringBuilder` and appending characters from the end of the original string to the beginning of the `StringBuilder` is efficient. Alternatively, converting the string to a `char[]`, performing an in-place reversal by swapping characters, and then converting back to a string is also a common and efficient approach.</p>",
            "incorrect": "<p><span>Incorrect.</span> Efficient string reversal often involves using a mutable structure like `StringBuilder` or a character array to avoid the overhead of creating multiple immutable `String` objects.</p>"
        },
        {
            "q": "What is a Hash Collision and how can it be handled?",
            "a": [
                {"option": "When two different hash functions produce the same hash code.", "correct": false},
                {"option": "When two different keys produce the same hash code (index in a hash table). It can be handled by techniques like Chaining (e.g., linked lists at each index) or Open Addressing (e.g., linear probing, quadratic probing).", "correct": true},
                {"option": "When a hash table runs out of memory.", "correct": false},
                {"option": "When a hash code is too large to be stored.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Hash collisions are inevitable when the number of possible keys exceeds the number of available slots in the hash table. Collision resolution strategies are essential for the correct functioning of hash tables (like HashMap).</p>",
            "incorrect": "<p><span>Incorrect.</span> Hash collisions occur when different keys map to the same bucket in a hash table. Techniques like separate chaining or open addressing are used to manage these collisions.</p>"
        },

        // System Design (Conceptual)
        {
            "q": "What is scalability in system design? Differentiate between horizontal and vertical scaling.",
            "a": [
                {"option": "Scalability is about system security.", "correct": false},
                {"option": "Scalability is the ability of a system to handle an increasing amount of load. Vertical scaling (scale up) means adding more resources (CPU, RAM) to an existing server. Horizontal scaling (scale out) means adding more servers to the system.", "correct": true},
                {"option": "Horizontal scaling is cheaper but less effective than vertical scaling.", "correct": false},
                {"option": "Vertical scaling is only for databases, horizontal for web servers.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Vertical scaling has limits based on the capacity of a single machine and can be more expensive beyond a certain point. Horizontal scaling offers better elasticity and fault tolerance but can introduce complexity in managing distributed systems.</p>",
            "incorrect": "<p><span>Incorrect.</span> Scalability ensures a system can grow to meet increased demand. Horizontal scaling adds more machines, while vertical scaling enhances existing machines.</p>"
        },
        {
            "q": "What is a load balancer and why is it used?",
            "a": [
                {"option": "A tool to balance financial loads in a project.", "correct": false},
                {"option": "A device or software that distributes network or application traffic across multiple servers. It's used to improve responsiveness and availability of applications by preventing any single server from becoming a bottleneck.", "correct": true},
                {"option": "A database optimization technique.", "correct": false},
                {"option": "A security component that filters malicious traffic.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Load balancers are crucial for achieving high availability and scalability in web applications. They can use various algorithms (e.g., round-robin, least connections) to distribute traffic.</p>",
            "incorrect": "<p><span>Incorrect.</span> A load balancer distributes incoming requests across a pool of backend servers to optimize resource utilization, maximize throughput, reduce latency, and ensure fault tolerance.</p>"
        },
        {
            "q": "Explain the concept of caching and its benefits in a web application.",
            "a": [
                {"option": "Caching is a way to encrypt sensitive user data.", "correct": false},
                {"option": "Caching is the process of storing copies of frequently accessed data in a temporary storage location (cache) so that future requests for that data can be served faster. Benefits include reduced latency, decreased load on backend systems, and improved application performance.", "correct": true},
                {"option": "Caching is primarily used for logging application events.", "correct": false},
                {"option": "Caching increases database write operations.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Caches can be implemented at various levels (client-side, CDN, server-side, database). Effective cache invalidation strategies are important to ensure data consistency.</p>",
            "incorrect": "<p><span>Incorrect.</span> Caching is a vital technique for improving the performance and scalability of web applications by storing and reusing frequently accessed data.</p>"
        },
        {
            "q": "What is CAP theorem in distributed systems?",
            "a": [
                {"option": "A theorem about CPU performance.", "correct": false},
                {"option": "CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition tolerance.", "correct": true},
                {"option": "A theorem related to network capacity planning.", "correct": false},
                {"option": "A theorem about API design principles.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> In the event of a network partition, a system must choose between consistency (all nodes see the same data at the same time) and availability (every request receives a response, even if it's not the most recent data). Most modern distributed systems choose AP (Availability and Partition tolerance) or CP (Consistency and Partition tolerance).</p>",
            "incorrect": "<p><span>Incorrect.</span> CAP theorem is a fundamental concept in designing distributed systems, highlighting the trade-offs between consistency, availability, and partition tolerance.</p>"
        },

        // Software Engineering Principles
        {
            "q": "What are the SOLID principles of object-oriented design?",
            "a": [
                {"option": "Secure, Optimized, Lightweight, Independent, Dynamic.", "correct": false},
                {"option": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", "correct": true},
                {"option": "Simple, Observable, Loggable, Integrated, Deployable.", "correct": false},
                {"option": "Scalable, Ordered, Linked, Indexed, Durable.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> SOLID principles are guidelines that help developers create more maintainable, flexible, and understandable object-oriented designs. Adhering to them can lead to robust and scalable software.</p>",
            "incorrect": "<p><span>Incorrect.</span> SOLID stands for: <b>S</b>ingle Responsibility Principle, <b>O</b>pen/Closed Principle, <b>L</b>iskov Substitution Principle, <b>I</b>nterface Segregation Principle, and <b>D</b>ependency Inversion Principle.</p>"
        },
        {
            "q": "Explain the Open/Closed Principle (OCP).",
            "a": [
                {"option": "Software entities should be open for modification but closed for extension.", "correct": false},
                {"option": "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. This means you should be able to add new functionality without changing existing code.", "correct": true},
                {"option": "All code should be open source.", "correct": false},
                {"option": "Files should be opened before reading and closed after.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> OCP promotes using abstractions (like interfaces or abstract classes) and polymorphism. New features are added by creating new classes that implement these abstractions, rather than altering existing, tested code.</p>",
            "incorrect": "<p><span>Incorrect.</span> The Open/Closed Principle is a key SOLID principle that aims to make systems more robust and easier to extend by minimizing changes to existing code.</p>"
        },
        {
            "q": "What is a Design Pattern? Give an example of a common creational pattern.",
            "a": [
                {"option": "A pattern for UI design layouts.", "correct": false},
                {"option": "A reusable solution to a commonly occurring problem within a given context in software design. Example of a creational pattern: Singleton, Factory Method, Abstract Factory, Builder, Prototype.", "correct": true},
                {"option": "A specific algorithm for sorting data.", "correct": false},
                {"option": "A way to structure database schemas.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Design patterns are well-tested solutions to recurring design problems. The Singleton pattern, for example, ensures a class has only one instance and provides a global point of access to it. The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate.</p>",
            "incorrect": "<p><span>Incorrect.</span> Design patterns provide generalized, reusable solutions to common software design problems. Creational patterns deal with object creation mechanisms.</p>"
        },
        {
            "q": "What is the difference between Coupling and Cohesion in software design?",
            "a": [
                {"option": "Coupling refers to how well a module is documented, Cohesion to its performance.", "correct": false},
                {"option": "Coupling is the degree of interdependence between software modules; low coupling is desirable. Cohesion refers to the degree to which the elements within a single module belong together; high cohesion is desirable.", "correct": true},
                {"option": "High coupling and low cohesion are desirable.", "correct": false},
                {"option": "They are synonyms for modularity.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> Strive for low coupling (modules are independent) and high cohesion (elements within a module are strongly related and focused on a single task). This leads to more maintainable, reusable, and understandable systems.</p>",
            "incorrect": "<p><span>Incorrect.</span> Good software design aims for low coupling (making modules independent) and high cohesion (making modules focused and self-contained).</p>"
        },
        {
            "q": "What is Test-Driven Development (TDD)?",
            "a": [
                {"option": "Testing the software only after development is complete.", "correct": false},
                {"option": "A software development process where developers write tests before writing the actual code. The cycle is Red (write a failing test), Green (write minimal code to pass the test), Refactor (improve the code while keeping tests green).", "correct": true},
                {"option": "A methodology where dedicated testers drive the development process.", "correct": false},
                {"option": "Developing tests for UI automation only.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> TDD helps ensure code quality, provides a safety net for refactoring, and drives design by forcing developers to think about how their code will be used before writing it.</p>",
            "incorrect": "<p><span>Incorrect.</span> TDD is an iterative development practice where tests are written before the functional code, guiding its implementation.</p>"
        },
        {
            "q": "In the context of Java concurrency, what is a `volatile` keyword used for?",
            "a": [
                {"option": "To make a variable immutable.", "correct": false},
                {"option": "To ensure that a variable's value is always read from main memory and not from a thread's local cache, and writes to it are immediately flushed to main memory. It guarantees visibility of changes to variables across threads.", "correct": true},
                {"option": "To mark a method as thread-safe.", "correct": false},
                {"option": "To indicate that a variable can only be accessed by one thread at a time.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The `volatile` keyword ensures visibility but does not guarantee atomicity for compound actions (e.g., `i++`). It's useful for simple flags or status variables shared between threads.</p>",
            "incorrect": "<p><span>Incorrect.</span> `volatile` ensures that reads and writes to a variable are atomic (for that variable itself, not compound operations) and that changes made by one thread are visible to others.</p>"
        },
        {
            "q": "What is the difference between `==` and `.equals()` when comparing objects in Java?",
            "a": [
                {"option": "There is no difference, they can be used interchangeably.", "correct": false},
                {"option": "`==` compares object references (memory addresses), checking if two references point to the same object. `.equals()` (as defined in the `Object` class) also compares references by default, but it is often overridden in classes (like `String`, `Integer`) to compare the actual content or state of the objects.", "correct": true},
                {"option": "`.equals()` is used for primitive types, `==` is for objects.", "correct": false},
                {"option": "`==` is always faster than `.equals()`.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> For objects, `==` checks for reference equality. `.equals()` should be used to check for logical equality (i.e., if the objects represent the same value or state), provided the class has correctly overridden the `equals()` method (and `hashCode()` accordingly).</p>",
            "incorrect": "<p><span>Incorrect.</span> `==` checks if two references point to the exact same object in memory, while `.equals()` is intended to check if two objects are meaningfully equivalent.</p>"
        },
        {
            "q": "What is the role of the `finally` block in a try-catch-finally statement?",
            "a": [
                {"option": "It is executed only if an exception occurs.", "correct": false},
                {"option": "It is always executed after the try block and any associated catch blocks complete, regardless of whether an exception was thrown or caught. It's typically used for cleanup operations like closing resources.", "correct": true},
                {"option": "It is executed only if no exception occurs.", "correct": false},
                {"option": "It is an alternative to a catch block for handling exceptions.", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> The `finally` block guarantees execution, making it ideal for releasing resources (e.g., closing files, network connections, database connections) to prevent resource leaks, even if an unexpected error occurs. (Note: try-with-resources is often preferred for resource management in modern Java).</p>",
            "incorrect": "<p><span>Incorrect.</span> The `finally` block is crucial for ensuring that cleanup code runs, irrespective of exceptions occurring in the `try` block.</p>"
        },
        // Fill-in-the-blank style questions
        {
            "q": "In Java Generics, `List<____>` is an example of an unbounded wildcard, allowing a list of any object type.",
            "a": [
                {"option": "Object", "correct": false},
                {"option": "?", "correct": true},
                {"option": "T", "correct": false},
                {"option": "String", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `List&lt;?&gt;` uses an unbounded wildcard, meaning it can hold a list of any unknown type. It's useful when the methods being called on the list elements don't depend on the specific type.</p>",
            "incorrect": "<p><span>Incorrect.</span> The unbounded wildcard in Java Generics is represented by `?`. `List&lt;Object&gt;` is a list that can hold any object, but it's not a wildcard. `T` is a type parameter placeholder.</p>"
        },
        {
            "q": "The Spring annotation `____` is used to indicate that a method should be executed after its bean has been constructed and dependencies injected.",
            "a": [
                {"option": "@PostConstruct", "correct": true},
                {"option": "@BeanInit", "correct": false},
                {"option": "@AfterCreation", "correct": false},
                {"option": "@PreDestroy", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `@PostConstruct` is a JSR-250 annotation that Spring supports. Methods annotated with `@PostConstruct` are invoked after dependency injection is done to perform any initialization.</p>",
            "incorrect": "<p><span>Incorrect.</span> The correct annotation is `@PostConstruct`. `@PreDestroy` is used for cleanup before a bean is removed from the container.</p>"
        },
        {
            "q": "In SQL, a `____ JOIN` returns all rows when there is a match in EITHER the left or the right table, including NULLs for non-matching columns.",
            "a": [
                {"option": "INNER", "correct": false},
                {"option": "LEFT", "correct": false},
                {"option": "RIGHT", "correct": false},
                {"option": "FULL OUTER", "correct": true}
            ],
            "correct": "<p><span>Correct!</span> A `FULL OUTER JOIN` (or `FULL JOIN` in some SQL dialects) returns all records when there is a match in left (table1) or right (table2) table records. If there is no match, the result is NULL on the side of the table that does not have a match.</p>",
            "incorrect": "<p><span>Incorrect.</span> `INNER JOIN` returns only matching rows. `LEFT JOIN` returns all rows from the left table and matched rows from the right. `RIGHT JOIN` does the opposite. `FULL OUTER JOIN` combines both.</p>"
        },
        {
            "q": "In Git, the command `git ____ &lt;branch-name&gt;` is used to switch to an existing branch or create and switch to a new branch if it doesn't exist (with the `-b` flag).",
            "a": [
                {"option": "switch", "correct": false},
                {"option": "checkout", "correct": true},
                {"option": "branch", "correct": false},
                {"option": "merge", "correct": false}
            ],
            "correct": "<p><span>Correct!</span> `git checkout &lt;branch-name&gt;` switches to an existing branch. `git checkout -b &lt;new-branch-name&gt;` creates and switches to a new branch. While `git switch` is a newer command for switching branches, `checkout` is the traditional command that also handles creating branches with `-b`.</p>",
            "incorrect": "<p><span>Incorrect.</span> The command is `git checkout`. `git branch &lt;branch-name&gt;` creates a branch but doesn't switch to it. `git switch` is a more modern alternative for just switching.</p>"
        }
        
        // Add more humor questions here
    ]
};

export default humorQuiz;
