- [ ] business logic in the endpoints wherever required.
- [ ] analytics and auditing for each of the action user/tenant/vendor carries out.


- [ ] user endpoints
- [ ] operator endpoints

- [ ] scoping logic for both user and operator,
      make such that a particular type of user can be assigned only from a set of scopes.
      only owner can grant the permission to assign the `assign:permission` scope.
      no user can assign or remove scopes from the owner.
      no operator can add or remove scopes from the super admin.

- [ ] payments system implement razorpay and stripe, better if we can integrate OAuth (OAuth is next step,
      first implement the encryption)

- [ ] implement the complete membership module and membership management this includes the webhook and the cron job

- [x] s3 implementation.
      - [ ] implement wherever signed url is required