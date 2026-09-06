import cron from "node-cron";
import Logger from "../../common/logger/index.js";

/**
  - [ ] Notify user 2, 1, current day, if past the due date notify the property manager.
  - [ ] 
 */

/**
 * A scheduler that keeps track of upcoming rents for tenants and notifies them
 * via email
 */
cron.schedule("* * * * *", function () {
  // Logger.info("CONDITION HIT")
})
