package com.profile.profile.service;


import com.profile.profile.dto.ProjectDTO;
import com.profile.profile.entity.Project;
import com.profile.profile.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    @Override
    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setKeySkills(dto.getKeySkills());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setHighlights(dto.getHighlights());

        Project saved = projectRepository.save(project);
        return mapToDTO(saved);
    }


    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        BeanUtils.copyProperties(dto, project, "id");
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
        dto.setKeySkills(project.getKeySkills());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setHighlights(project.getHighlights());
        dto.setImageUrl(project.getImageUrl());
        return dto;
    }

}