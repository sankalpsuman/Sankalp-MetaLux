# Security Specification - Commercial Website

## Data Invariants
1. **Admins**: Must be registered in the `admins` collection with `status == 'active'`.
2. **Super Admin**: Only `sankalpsmn@gmail.com` (hardcoded) or users with `role == 'super_admin'` in the `admins` collection.
3. **Products**: Publicly viewable. Modifiable only by active admins.
4. **Feedback**: Anyone can leave feedback. Only active admins can delete it.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempting to create an admin entry as a non-admin.
2. **Privilege Escalation**: Attempting to update own role to `super_admin`.
3. **Bypassing Inactivity**: Attempting to perform admin actions while `status` is `disabled`.
4. **Schema Poisoning**: Adding a 1MB string to a product description.
5. **Unauthorized Product Edit**: Modifying price as a customer.
6. **Malicious Feedback**: Adding feedback with an extremely large comment.
7. **Orphaned Feedback**: Creating feedback for a non-existent product.
8. **Admin Lockdown Bypass**: Attempting to delete the main super admin document.
9. **Status Modification**: A regular admin trying to disable the super admin.
10. **Shadow Updates**: Including a `isVerified` field in a product update.
11. **Client Timestamp Manipulation**: Providing a future date for `createdAt`.
12. **Public Admin Read**: Trying to list all admins without being a super admin.

## Conflict Report

| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning |
| :--- | :--- | :--- | :--- |
| `admins` | Blocked by `isSuperAdmin` | Immutable `email` | `isValidAdmin` checks |
| `products` | Blocked by `isAdmin` | Immutable `createdAt` | `isValidProduct` checks |
| `feedback` | N/A (Public) | N/A | `isValidFeedback` checks |
