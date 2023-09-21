# Backwards Compatibility for the Python SDK

This doc is for [Omnilog Devs](./user_types.md) who want to contribute to the Omnilog open source project.
## Use semantic versioning (MAJOR.MINOR.PATCH)

- MAJOR: When you add code that is not backwards compatible
- MINOR: When you add functionality that is backwards compatible
- PATCH: When you implement bug fixes that are backward compatible

## Prevent bugs
- Avoid global state
- Limit dependencies
- Implement extensive testing

## Give your users visibility
- Document changes in a changelog
- Provide migration guides between MAJOR versions
- Use deprecation warnings in the code to give the users some time to make necessary changes.

## Give your users options
- Use feature flags to allow users to use the new features while maintaining old functionalities

## Don't screw your users over
- Avoid changing public interfaces
- Avoid renaming or removing modules
- Be careful when changing exceptions as users might be catching them





