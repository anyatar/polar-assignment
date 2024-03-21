
### Part 2 - Theoretical 

-- Lets Run! has become super popular which while obviously goods news, has surfaced a new problem.\
--- Apparently, people really like running at 6AM, which causes spikes in the requests sent to the update endpoint, overloading the network and causing slowdowns and unresponsiveness in the application.\
--- How would you solve this issue? Please provide 2 suggestions.

**Generally** I used asynchronous operations for a non-blocking event loop running in Node.js.
For example, when I used the crypto module I chose asynchronous (callback-based) operations because crypto operations are CPU-intensive and can block the event loop for an undesired amount of time. 
When using the asynchronous versions, it passes the crypto operations off to the thread pool and the CPU intensive work is performed without blocking the event loop.

Regarding to 6AM **spikes** of update endpoint one of the reasonable solutions to handle increased traffic to have optimal perfomance and reliablity can be:

+ To implement a read/write **caching** mechanism (consider to use in-mem cache like Redis for example) to store the previously updated data so that it can be accessable without having to access the database. If the runner isn't in the cache - we fetch them from the database. That way we can immediately calculate and return the updated result and in parallel update the real database asynchronously (using another service based on e.g. pubsub/message queue) without having for the slow update to finish.  This will greatly improve the response time.

+ Also **horizontal scaling** with a load balancer can be helpful in this case: allowing to add more instances under high load. HPA configuration in Kubernetes can be added with the right metrics after performance testing using for example Apache JMeter.

+ Because the **database** can be a bottle neck in the system it is recommended to optimize it by clustering that can reduce the overhead per server, for example sharding of MySQL.

+ About the requirements of the system - they can be improved by moving to **uid**-based identification (unique user identifier that I already have in my db (autoincremented id)). It's created during signup and should be returned to the user for future update & stats operation idenitification (instead of first+last names that aren't unique and force us to fetch all users with the same name, and run expensive crypto operations on each). 
