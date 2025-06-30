package com.profile.profile.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @NotBlank(message = "Title is required")
    private String title;

    @Column(length = 1000)
    private String description;

    private String keySkills;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 1000)
    private String highlights;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    public Project() {
    }

    public Project(Long id, String title, String description, String keySkills, LocalDate startDate, LocalDate endDate, String highlights, String imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.keySkills = keySkills;
        this.startDate = startDate;
        this.endDate = endDate;
        this.highlights = highlights;
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKeySkills() {
        return keySkills;
    }

    public void setKeySkills(String keySkills) {
        this.keySkills = keySkills;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getHighlights() {
        return highlights;
    }

    public void setHighlights(String highlights) {
        this.highlights = highlights;
    }
}
