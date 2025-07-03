package com.profile.profile.service;


import com.profile.profile.dto.ProjectDTO;
import com.profile.profile.entity.Project;
import com.profile.profile.entity.Skill;
import com.profile.profile.repository.ProjectRepository;
import com.profile.profile.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service

public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }
    @Override

    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setHighlights(dto.getHighlights());
        project.setImageUrl(dto.getImageUrl());

        // Map skills
        Set<Skill> skills = getOrCreateSkills(dto.getSkills());
        project.setSkills(skills);

        Project saved = projectRepository.save(project);
        return mapToDTO(saved);
    }


    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setHighlights(dto.getHighlights());
        project.setImageUrl(dto.getImageUrl());

        // Update skills
        Set<Skill> updatedSkills = getOrCreateSkills(dto.getSkills());
        project.setSkills(updatedSkills);

        return mapToDTO(projectRepository.save(project));
    }

    @Override
    public Project getProjectEntityById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }


    @Override
    public Project saveProjectEntity(Project project) {
        return projectRepository.save(project);
    }



    @Override
    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }
        projectRepository.deleteById(id);
    }

    private ProjectDTO mapToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setDescription(project.getDescription());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setHighlights(project.getHighlights());
        dto.setImageUrl(project.getImageUrl());

        // Convert skills to set of names
        Set<String> skillNames = project.getSkills()
                .stream()
                .map(Skill::getName)
                .collect(Collectors.toSet());
        dto.setSkills(skillNames);


        return dto;
    }

    private Set<Skill> getOrCreateSkills(Set<String> skillNames) {
        if (skillNames == null || skillNames.isEmpty()) return Collections.emptySet();

        Set<Skill> skills = new HashSet<>();

        for (String name : skillNames) {
            Skill skill = skillRepository.findByNameIgnoreCase(name)
                    .orElseGet(() -> skillRepository.save(new Skill(name.trim())));
            skills.add(skill);
        }

        return skills;
    }

}