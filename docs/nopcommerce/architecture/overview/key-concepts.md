# nopCommerce Key Concepts

[Home](../../index.md) | [Overview](index.md) | [Previous: Solution Structure](solution-structure.md) | [Next: Core Framework](../core/index.md)

## Introduction

This document explains the key concepts and terminology used throughout the nopCommerce architecture. Understanding these concepts is essential for working effectively with the platform.

## Domain Concepts

### Store

```mermaid
graph TD
    Store[Store]
    Store --> Domain[Domain]
    Store --> Languages[Languages]
    Store --> Currencies[Currencies]
    Store --> Catalog[Catalog]
    Store --> Customers[Customers]
    Store --> Orders[Orders]
```

A store represents a single shop within the nopCommerce system. nopCommerce supports multi-store operation, allowing multiple stores to be managed from a single installation.

**Key Characteristics:**
- Unique domain name
- Specific theme and branding
- Dedicated catalog and pricing
- Separate customer base
- Individual settings

### Catalog

```mermaid
graph TD
    Catalog[Catalog]
    Catalog --> Categories[Categories]
    Catalog --> Manufacturers[Manufacturers]
    Catalog --> Products[Products]
    Products --> Attributes[Product Attributes]
    Products --> Specifications[Specification Attributes]
    Products --> Variants[Product Variants]
    Products --> RelatedProducts[Related Products]
```

The catalog represents the products and their organization within the store.

**Key Components:**
- **Categories**: Hierarchical organization of products
- **Manufacturers**: Product brands or manufacturers
- **Products**: Items available for purchase
- **Attributes**: Customizable product features (size, color, etc.)
- **Specifications**: Technical characteristics of products

### Customer

```mermaid
graph TD
    Customer[Customer]
    Customer --> Roles[Customer Roles]
    Customer --> Addresses[Addresses]
    Customer --> ShoppingCart[Shopping Cart]
    Customer --> WishList[Wishlist]
    Customer --> Orders[Orders]
    Customer --> Reviews[Reviews]
```

Customers are users who browse and purchase products from the store.

**Key Aspects:**
- **Registration**: Account creation process
- **Authentication**: Login and security
- **Roles**: Permission groups (Registered, Administrators, etc.)
- **Shopping Cart**: Items selected for potential purchase
- **Wishlist**: Saved products for future consideration
- **Orders**: Purchase history

### Order

```mermaid
graph TD
    Order[Order]
    Order --> OrderItems[Order Items]
    Order --> BillingAddress[Billing Address]
    Order --> ShippingAddress[Shipping Address]
    Order --> PaymentMethod[Payment Method]
    Order --> ShippingMethod[Shipping Method]
    Order --> OrderStatus[Order Status]
    Order --> OrderNotes[Order Notes]
```

An order represents a customer's purchase transaction.

**Key Components:**
- **Order Items**: Products and quantities purchased
- **Billing/Shipping Addresses**: Customer addresses
- **Payment Method**: Selected payment option
- **Shipping Method**: Selected shipping option
- **Order Status**: Current status (Pending, Processing, Complete, etc.)
- **Order Total**: Sum of items, tax, shipping, etc.

### Content

```mermaid
graph TD
    Content[Content]
    Content --> Topics[Topics]
    Content --> News[News]
    Content --> Blog[Blog]
    Content --> Forums[Forums]
    Content --> Messages[Message Templates]
```

Content elements that provide information to customers.

**Key Types:**
- **Topics**: Static pages (About Us, Privacy Policy, etc.)
- **News**: News articles
- **Blog**: Blog posts
- **Forums**: Customer discussion forums
- **Message Templates**: Email templates

## Technical Concepts

### Plugin

```mermaid
graph TD
    Plugin[Plugin]
    Plugin --> PaymentPlugins[Payment Methods]
    Plugin --> ShippingPlugins[Shipping Methods]
    Plugin --> TaxPlugins[Tax Providers]
    Plugin --> ExternalAuthPlugins[External Authentication]
    Plugin --> WidgetPlugins[Widgets]
    Plugin --> MiscPlugins[Miscellaneous]
```

Plugins extend the functionality of nopCommerce without modifying the core code.

**Key Characteristics:**
- Self-contained modules
- Specific functionality extension
- Configuration through admin interface
- Can be installed/uninstalled at runtime
- Stored in the Plugins directory

### Theme

```mermaid
graph TD
    Theme[Theme]
    Theme --> Views[Views]
    Theme --> CSS[Stylesheets]
    Theme --> JS[JavaScript]
    Theme --> Images[Images]
    Theme --> Layouts[Layouts]
```

Themes control the visual appearance of the store.

**Key Components:**
- **Views**: Razor templates for rendering UI
- **Stylesheets**: CSS for styling
- **JavaScript**: Client-side functionality
- **Images**: Theme graphics
- **Layouts**: Page layouts and structures

### Localization

```mermaid
graph TD
    Localization[Localization]
    Localization --> Languages[Languages]
    Localization --> Resources[Resources]
    Localization --> LocalizedEntities[Localized Entities]
    Localization --> RTL[RTL Support]
```

Localization allows the store to be presented in multiple languages.

**Key Aspects:**
- **Languages**: Supported languages
- **Resources**: Translated strings
- **Localized Entities**: Products, categories, etc. with translated properties
- **RTL Support**: Right-to-left language support

### Settings

```mermaid
graph TD
    Settings[Settings]
    Settings --> GeneralSettings[General]
    Settings --> CatalogSettings[Catalog]
    Settings --> CustomerSettings[Customer]
    Settings --> OrderSettings[Order]
    Settings --> TaxSettings[Tax]
    Settings --> ShippingSettings[Shipping]
    Settings --> MediaSettings[Media]
```

Settings control the behavior of various aspects of the store.

**Key Categories:**
- **General**: Store-wide settings
- **Catalog**: Product display and behavior
- **Customer**: Registration and account settings
- **Order**: Order processing settings
- **Tax**: Tax calculation settings
- **Shipping**: Shipping calculation settings
- **Media**: Image and media settings

### Dependency Injection

```mermaid
graph TD
    DI[Dependency Injection]
    DI --> ServiceRegistration[Service Registration]
    DI --> ServiceResolution[Service Resolution]
    DI --> Lifetimes[Service Lifetimes]
    Lifetimes --> Singleton[Singleton]
    Lifetimes --> Scoped[Scoped]
    Lifetimes --> Transient[Transient]
```

Dependency Injection is a core pattern used throughout nopCommerce.

**Key Concepts:**
- **Registration**: Services are registered with the DI container
- **Resolution**: Services are resolved when needed
- **Lifetimes**: Determine how long a service instance lives
  - **Singleton**: One instance for the application lifetime
  - **Scoped**: One instance per request
  - **Transient**: New instance each time

### Events

```mermaid
graph TD
    Events[Event System]
    Events --> Publisher[Event Publisher]
    Events --> Consumers[Event Consumers]
    Events --> EntityEvents[Entity Events]
    EntityEvents --> EntityInserted[Entity Inserted]
    EntityEvents --> EntityUpdated[Entity Updated]
    EntityEvents --> EntityDeleted[Entity Deleted]
```

The event system enables loose coupling between components.

**Key Components:**
- **Event Publisher**: Publishes events
- **Event Consumers**: Handle published events
- **Entity Events**: Events triggered by entity operations
  - **Entity Inserted**: Triggered when an entity is created
  - **Entity Updated**: Triggered when an entity is updated
  - **Entity Deleted**: Triggered when an entity is deleted

### Caching

```mermaid
graph TD
    Caching[Caching System]
    Caching --> StaticCache[Static Cache]
    Caching --> MemoryCache[Memory Cache]
    Caching --> DistributedCache[Distributed Cache]
    Caching --> CacheKeys[Cache Keys]
    Caching --> CacheManager[Cache Manager]
```

Caching improves performance by storing frequently accessed data.

**Key Components:**
- **Static Cache**: In-memory cache for static data
- **Memory Cache**: In-memory cache for dynamic data
- **Distributed Cache**: Redis or SQL Server-based cache for multi-server setups
- **Cache Keys**: Unique identifiers for cached items
- **Cache Manager**: Manages cache operations

### Repository

```mermaid
graph TD
    Repository[Repository Pattern]
    Repository --> EFCore[Entity Framework Core]
    Repository --> DataContext[Data Context]
    Repository --> Entities[Entities]
    Repository --> QueryMethods[Query Methods]
    Repository --> CRUDMethods[CRUD Methods]
```

Repositories abstract data access operations.

**Key Aspects:**
- **Entity Framework Core**: ORM used for data access
- **Data Context**: Database context
- **Entities**: Domain objects mapped to database tables
- **Query Methods**: Methods for retrieving entities
- **CRUD Methods**: Create, Read, Update, Delete operations

### Task Scheduling

```mermaid
graph TD
    TaskScheduling[Task Scheduling]
    TaskScheduling --> ScheduleTasks[Scheduled Tasks]
    TaskScheduling --> TaskRunner[Task Runner]
    TaskScheduling --> TaskFrequency[Task Frequency]
```

Task scheduling enables background processing of operations.

**Key Components:**
- **Scheduled Tasks**: Tasks registered for background execution
- **Task Runner**: Executes scheduled tasks
- **Task Frequency**: How often tasks run

## Multi-tenancy Concepts

### Multi-store

```mermaid
graph TD
    MultiStore[Multi-store]
    MultiStore --> SharedDatabase[Shared Database]
    MultiStore --> StoreMapping[Store Mapping]
    MultiStore --> StoreContext[Store Context]
    MultiStore --> StoreSpecificSettings[Store-specific Settings]
```

Multi-store allows running multiple stores from a single nopCommerce installation.

**Key Aspects:**
- **Shared Database**: All stores share the same database
- **Store Mapping**: Entities can be mapped to specific stores
- **Store Context**: Identifies the current store
- **Store-specific Settings**: Each store can have unique settings

### Multi-vendor

```mermaid
graph TD
    MultiVendor[Multi-vendor]
    MultiVendor --> Vendors[Vendors]
    MultiVendor --> VendorSettings[Vendor Settings]
    MultiVendor --> VendorMapping[Vendor Mapping]
    MultiVendor --> VendorAttributes[Vendor Attributes]
```

Multi-vendor allows multiple sellers to sell products through the same store.

**Key Components:**
- **Vendors**: Seller accounts
- **Vendor Settings**: Settings controlling vendor behavior
- **Vendor Mapping**: Products mapped to vendors
- **Vendor Attributes**: Custom attributes for vendors

## Security Concepts

### Authentication

```mermaid
graph TD
    Authentication[Authentication]
    Authentication --> StandardAuth[Standard Authentication]
    Authentication --> ExternalAuth[External Authentication]
    Authentication --> MFA[Multi-factor Authentication]
    Authentication --> Cookies[Authentication Cookies]
```

Authentication verifies user identity.

**Key Methods:**
- **Standard Authentication**: Username/password
- **External Authentication**: OAuth providers (Google, Facebook, etc.)
- **Multi-factor Authentication**: Additional verification steps
- **Authentication Cookies**: Session management

### Authorization

```mermaid
graph TD
    Authorization[Authorization]
    Authorization --> CustomerRoles[Customer Roles]
    Authorization --> Permissions[Permissions]
    Authorization --> ACL[ACL]
    Authorization --> PermissionProviders[Permission Providers]
```

Authorization controls access to features and resources.

**Key Components:**
- **Customer Roles**: Groups with specific permissions
- **Permissions**: Access rights to features
- **ACL**: Access Control Lists for specific entities
- **Permission Providers**: Define available permissions

### Data Protection

```mermaid
graph TD
    DataProtection[Data Protection]
    DataProtection --> Encryption[Encryption]
    DataProtection --> Hashing[Hashing]
    DataProtection --> SecureConfiguration[Secure Configuration]
    DataProtection --> GDPR[GDPR Features]
```

Data protection secures sensitive information.

**Key Aspects:**
- **Encryption**: Securing sensitive data
- **Hashing**: One-way transformation for passwords
- **Secure Configuration**: Protection of configuration values
- **GDPR Features**: Data privacy compliance features

## Glossary of Terms

| Term | Definition |
|------|------------|
| ACL | Access Control List, used to restrict entity access to specific customer roles |
| BaseEntity | Base class for all entities in nopCommerce |
| Catalog | Collection of products, categories, and manufacturers |
| Customer Role | Group that defines permissions for customers |
| GDPR | General Data Protection Regulation compliance features |
| IEngine | Interface for the nopCommerce engine that manages services |
| IRepository | Interface for data access using the repository pattern |
| IWorkContext | Interface providing context about the current customer, language, etc. |
| IStoreContext | Interface providing context about the current store |
| Plugin | Self-contained module that extends functionality |
| SEO | Search Engine Optimization features for products, categories, etc. |
| Store | A single shop within a nopCommerce installation |
| Theme | Collection of files that control the visual appearance |
| Widget | UI component that can be placed in widget zones |
| Widget Zone | Predefined area in the UI where widgets can be placed |

---

*Next: [Core Framework](../core/index.md)*

---

*[Home](../../index.md) | [Overview](index.md) | [Previous: Solution Structure](solution-structure.md) | [Next: Core Framework](../core/index.md)*