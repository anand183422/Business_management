package com.example.PackageManager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "package_features")
public class PackageFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many features belong to one package
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id")
    private PackageEntity aPackage;

    // Many features belong to one product
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    // Default constructor
    public PackageFeature() {}

    // All-args constructor
    public PackageFeature(PackageEntity aPackage, Product product) {
        this.aPackage = aPackage;
        this.product = product;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public PackageEntity getPackage() {
        return aPackage;
    }

    public void setPackage(PackageEntity aPackage) {
        this.aPackage = aPackage;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void save(PackageFeature packageFeature) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }
}
