
### Part 2 - Theoretical 

-- Lets Run! has become super popular which while obviously goods news, has surfaced a new problem.\
--- Apparently, people really like running at 6AM, which causes spikes in the requests sent to the update endpoint, overloading the network and causing slowdowns and unresponsiveness in the application.\
--- How would you solve this issue? Please provide 2 suggestions.

**Generally** i used asynchronous operations for not blocking event loop Node.js running.
For example, when i used crypto module i choose asynchronous (callback-based) operations is because crypto operations are CPU-intensive and can block the event loop for an undesired amount of time. 
When you use the asynchronous versions, it passes the crypto operations off to the thread pool and the CPU intensive work is performed without blocking the event loop.

Regarding to 6AM **spikes** of update endpoint one of reasonable solutions to handle increased traffic to have optimail perfomance and reliablity can be:

+ To implement **caching** mechanism (consider to use in-mem cache like Redis for example) to store the previous updated data so it can be accessable without access to database so we can immediately to return supposed result meantime the real databse update will be proceessed asynchronously that we dont need to wait to be finished. It will improve the response time.

+ Also **horizontal scaling** with load balancer can be helpful in this case: allowing add more instances in high scale. HPA configuration in Kubernetes can be added with right metrics after performance testing usung for example Apache JMeter.

+ Because **database** can be bottle neck in the system to optimize is recommended to use distributed databases that can reduce overhead, for example sharding of mysql.

+ About requirements of the system can be improved by using **uuid** (unique user identifier that i already have in my db (autoincremented id) and is creted in signup and should be returned to user for following update operation for user's indenrification (instead of name that can be dublicated and we dont have exact match in database - now we fetch all users with his name). 
