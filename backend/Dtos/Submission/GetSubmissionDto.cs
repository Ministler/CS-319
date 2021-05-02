using System;
using backend.Dtos.Assignment;
using backend.Dtos.ProjectGroup;

namespace backend.Dtos.Submission
{
    public class GetSubmissionDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public GetAssignmentDto AffiliatedAssignment { get; set; }
        public bool IsGraded { get; set; }
        public decimal SrsGrade { get; set; }
        // public int AffiliatedAssignmentId { get; set; }
        // public GetProjectGroupDto AffiliatedGroup { get; set; }
        public int AffiliatedGroupId { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string FileEndpoint { get; set; }
        public bool HasSubmission { get; set; }
        public int CourseId { get; set; }
        public int SectionId { get; set; }
    }
}