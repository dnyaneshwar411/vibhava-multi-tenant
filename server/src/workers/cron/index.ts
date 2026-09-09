import cron from "node-cron";
import LeaseService from "../../core/services/lease.service.js";
import MembershipService from "../../core/services/membership.service.js";

/**
  - [ ] Notify user 2, 1, current day, if past the due date notify the property manager.
  - [ ] 
 */

/**
 * membership toggle for each organization
 */
cron.schedule("0 2 * * *", MembershipService.processExpiringMemberships, {
  timezone: "Asia/Kolkata"
})


/**
 * process all the leases that are expiring and update the status of the lease accordingly.
 */
cron.schedule("0 1 * * *", LeaseService.processExpiringLeases, {
  timezone: "Asia/Kolkata",
})


/**
 * A scheduler that keeps track of upcoming rents for tenants and notifies them
 * via email
 */
cron.schedule("0 2 * * *", async function () {
  // Logger.info("CONDITION HIT")
})
