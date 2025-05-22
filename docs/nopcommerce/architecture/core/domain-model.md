# nopCommerce Domain Model

[Home](../../index.md) | [Core Framework](index.md) | [Previous: Core Framework](index.md) | [Next: Infrastructure](infrastructure.md)

## Introduction

The domain model is the heart of the nopCommerce application, representing the core business entities and their relationships. This document describes the architecture of the domain model, which is defined in the `Nop.Core` project.

## Domain Model Overview

The nopCommerce domain model follows a rich domain model approach, where entities encapsulate both data and behavior. All domain entities inherit from the `BaseEntity` class, which provides basic identity and equality functionality.

```mermaid
classDiagram
    class BaseEntity {
        +Id: int
        +Equals(obj: object) bool
        +GetHashCode() int
    }
    
    BaseEntity <|-- Product
    BaseEntity <|-- Category
    BaseEntity <|-- Manufacturer
    BaseEntity <|-- Customer
    BaseEntity <|-- Order
    BaseEntity <|-- Store
    
    class Product {
        +Name: string
        +ShortDescription: string
        +FullDescription: string
        +Sku: string
        +Price: decimal
        +OldPrice: decimal
        +Published: bool
        +ProductCategories: ICollection~ProductCategory~
        +ProductManufacturers: ICollection~ProductManufacturer~
    }
    
    class Category {
        +Name: string
        +Description: string
        +ParentCategoryId: int?
        +PictureId: int?
        +Published: bool
        +DisplayOrder: int
        +ProductCategories: ICollection~ProductCategory~
    }
    
    class Customer {
        +Username: string
        +Email: string
        +PasswordHash: string
        +Active: bool
        +CustomerRoles: ICollection~CustomerRole~
        +ShoppingCartItems: ICollection~ShoppingCartItem~
        +Orders: ICollection~Order~
    }
    
    class Order {
        +OrderGuid: Guid
        +CustomerId: int
        +OrderStatusId: int
        +PaymentStatusId: int
        +ShippingStatusId: int
        +OrderTotal: decimal
        +OrderItems: ICollection~OrderItem~
    }
```

## Core Domain Areas

The domain model is organized into several core areas:

### Catalog Domain

The catalog domain represents products and their organization.

```mermaid
classDiagram
    BaseEntity <|-- Product
    BaseEntity <|-- Category
    BaseEntity <|-- Manufacturer
    BaseEntity <|-- ProductAttribute
    BaseEntity <|-- ProductAttributeMapping
    BaseEntity <|-- ProductAttributeValue
    
    Product --> "0..*" ProductCategory : has
    Product --> "0..*" ProductManufacturer : has
    Product --> "0..*" ProductAttributeMapping : has
    ProductAttributeMapping --> "1" ProductAttribute : references
    ProductAttributeMapping --> "0..*" ProductAttributeValue : has
    
    class Product {
        +Name: string
        +ShortDescription: string
        +FullDescription: string
        +Sku: string
        +Price: decimal
        +Published: bool
    }
    
    class Category {
        +Name: string
        +Description: string
        +ParentCategoryId: int?
        +Published: bool
        +DisplayOrder: int
    }
    
    class Manufacturer {
        +Name: string
        +Description: string
        +Published: bool
        +DisplayOrder: int
    }
    
    class ProductCategory {
        +ProductId: int
        +CategoryId: int
        +DisplayOrder: int
    }
    
    class ProductManufacturer {
        +ProductId: int
        +ManufacturerId: int
        +DisplayOrder: int
    }
    
    class ProductAttribute {
        +Name: string
        +Description: string
    }
    
    class ProductAttributeMapping {
        +ProductId: int
        +ProductAttributeId: int
        +TextPrompt: string
        +IsRequired: bool
    }
    
    class ProductAttributeValue {
        +ProductAttributeMappingId: int
        +Name: string
        +PriceAdjustment: decimal
    }
```

### Customer Domain

The customer domain represents users and their roles.

```mermaid
classDiagram
    BaseEntity <|-- Customer
    BaseEntity <|-- CustomerRole
    BaseEntity <|-- Address
    BaseEntity <|-- ShoppingCartItem
    
    Customer --> "0..*" CustomerRole : has
    Customer --> "0..*" Address : has
    Customer --> "0..*" ShoppingCartItem : has
    
    class Customer {
        +Username: string
        +Email: string
        +PasswordHash: string
        +Active: bool
        +CreatedOnUtc: DateTime
        +LastActivityDateUtc: DateTime
    }
    
    class CustomerRole {
        +Name: string
        +SystemName: string
        +Active: bool
        +IsSystemRole: bool
    }
    
    class Address {
        +FirstName: string
        +LastName: string
        +Email: string
        +Company: string
        +CountryId: int?
        +StateProvinceId: int?
        +City: string
        +Address1: string
        +Address2: string
        +ZipPostalCode: string
        +PhoneNumber: string
    }
    
    class ShoppingCartItem {
        +CustomerId: int
        +ProductId: int
        +ShoppingCartTypeId: int
        +Quantity: int
        +AttributesXml: string
        +CreatedOnUtc: DateTime
        +UpdatedOnUtc: DateTime
    }
```

### Order Domain

The order domain represents the purchasing process.

```mermaid
classDiagram
    BaseEntity <|-- Order
    BaseEntity <|-- OrderItem
    BaseEntity <|-- OrderNote
    BaseEntity <|-- Shipment
    
    Order --> "1..*" OrderItem : contains
    Order --> "0..*" OrderNote : has
    Order --> "0..*" Shipment : has
    
    class Order {
        +OrderGuid: Guid
        +CustomerId: int
        +OrderStatusId: int
        +PaymentStatusId: int
        +ShippingStatusId: int
        +OrderTotal: decimal
        +CreatedOnUtc: DateTime
    }
    
    class OrderItem {
        +OrderId: int
        +ProductId: int
        +Quantity: int
        +UnitPriceInclTax: decimal
        +UnitPriceExclTax: decimal
    }
    
    class OrderNote {
        +OrderId: int
        +Note: string
        +CreatedOnUtc: DateTime
    }
    
    class Shipment {
        +OrderId: int
        +TrackingNumber: string
        +TotalWeight: decimal?
        +ShippedDateUtc: DateTime?
        +DeliveryDateUtc: DateTime?
    }
```

### Content Domain

The content domain represents informational content.

```mermaid
classDiagram
    BaseEntity <|-- Topic
    BaseEntity <|-- News
    BaseEntity <|-- BlogPost
    
    class Topic {
        +SystemName: string
        +Title: string
        +Body: string
        +Published: bool
    }
    
    class News {
        +Title: string
        +Short: string
        +Full: string
        +Published: bool
        +CreatedOnUtc: DateTime
    }
    
    class BlogPost {
        +Title: string
        +Body: string
        +Tags: string
        +Published: bool
        +CreatedOnUtc: DateTime
    }
```

### Multi-Store Domain

The multi-store domain represents store configuration.

```mermaid
classDiagram
    BaseEntity <|-- Store
    BaseEntity <|-- StoreMapping
    
    Store --> "0..*" StoreMapping : has
    
    class Store {
        +Name: string
        +Url: string
        +SslEnabled: bool
        +DisplayOrder: int
    }
    
    class StoreMapping {
        +EntityId: int
        +EntityName: string
        +StoreId: int
    }
```

## Entity Relationships

nopCommerce entities are related in various ways, forming a complex object graph. The most common relationships are:

### One-to-Many Relationships

One-to-many relationships are represented by navigation properties in the parent entity and a foreign key in the child entity.

```csharp
// Parent entity
public class Category : BaseEntity
{
    public virtual ICollection<ProductCategory> ProductCategories { get; set; }
}

// Child entity
public class ProductCategory : BaseEntity
{
    public int CategoryId { get; set; }
    public int ProductId { get; set; }
    public int DisplayOrder { get; set; }
    
    public virtual Category Category { get; set; }
    public virtual Product Product { get; set; }
}
```

### Many-to-Many Relationships

Many-to-many relationships are represented using junction tables, implemented as separate entities.

```csharp
// Entity 1
public class Product : BaseEntity
{
    public virtual ICollection<ProductCategory> ProductCategories { get; set; }
}

// Junction entity
public class ProductCategory : BaseEntity
{
    public int CategoryId { get; set; }
    public int ProductId { get; set; }
    
    public virtual Category Category { get; set; }
    public virtual Product Product { get; set; }
}

// Entity 2
public class Category : BaseEntity
{
    public virtual ICollection<ProductCategory> ProductCategories { get; set; }
}
```

### Inheritance

Inheritance is used sparingly in the domain model, primarily through the `BaseEntity` class.

```csharp
public abstract class BaseEntity
{
    public int Id { get; set; }
}

public class Product : BaseEntity
{
    // Product-specific properties
}
```

## Domain Entity Design Principles

The nopCommerce domain model follows several key design principles:

### 1. Rich Domain Model

Entities encapsulate both data and behavior, with logic that pertains directly to the entity included within the entity class.

### 2. Persistence Ignorance

Domain entities are designed to be persistence-ignorant, meaning they don't have direct dependencies on the data access layer.

### 3. Immutable Identity

Entity identity is immutable once established, with the `Id` property serving as the primary identifier.

### 4. Value Objects

Value objects are used for concepts that don't have an identity, such as money, dates, and addresses.

### 5. Validation

Entity validation is primarily handled at the service layer, not within the entities themselves.

## Entity Configuration

Entity configuration is separated from the entities themselves and defined in the Data layer using Entity Framework Core's Fluent API.

```csharp
// In Nop.Data project
public class ProductMap : NopEntityTypeConfiguration<Product>
{
    public override void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable(nameof(Product));
        builder.HasKey(product => product.Id);
        
        builder.Property(product => product.Name).HasMaxLength(400).IsRequired();
        builder.Property(product => product.Price).HasPrecision(18, 4);
        // Additional configuration
    }
}
```

## Settings and Configuration Entities

nopCommerce uses strongly-typed settings classes that inherit from `ISettings` to represent configuration:

```csharp
public class CatalogSettings : ISettings
{
    public bool ShowProductSku { get; set; }
    public bool ShowManufacturerPartNumber { get; set; }
    public bool ShowGtin { get; set; }
    // Additional settings
}
```

## Localization and Store Mapping

Entities that support localization and multi-store functionality implement specific interfaces:

```csharp
public interface ILocalizedEntity
{
    // Marker interface for localized entities
}

public interface IStoreMappingSupported
{
    // Marker interface for store-mapped entities
}

public class Product : BaseEntity, ILocalizedEntity, IStoreMappingSupported
{
    // Product properties
}
```

## Generic Attributes

nopCommerce uses a flexible approach to extend entities without modifying their structure, through generic attributes:

```csharp
public class GenericAttribute : BaseEntity
{
    public int EntityId { get; set; }
    public string EntityName { get; set; }
    public string KeyGroup { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
    public int StoreId { get; set; }
}
```

This allows for dynamic extension of entities without schema changes.

## Conclusion

The nopCommerce domain model provides a rich representation of the e-commerce domain, with entities that encapsulate both data and behavior. Understanding this model is essential for effective customization and extension of the platform.

---

*Next: [Infrastructure](infrastructure.md)*

---

*[Home](../../index.md) | [Core Framework](index.md) | [Previous: Core Framework](index.md) | [Next: Infrastructure](infrastructure.md)*