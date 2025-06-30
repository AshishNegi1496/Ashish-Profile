package com.profile.profile.dto;

import lombok.*;

import java.time.LocalDate;


public class ProjectDTO {

    private Long id;
    private String title;
    private String description;
    private String keySkills;
    private LocalDate startDate;
    private LocalDate endDate;
    private String highlights;
    private String imageUrl;


    public ProjectDTO() {
    }

    public ProjectDTO(Long id, String title, String description, String keySkills, LocalDate startDate, LocalDate endDate, String highlights, String imageUrl) {
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


