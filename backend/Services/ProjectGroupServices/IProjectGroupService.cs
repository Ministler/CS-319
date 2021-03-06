using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos.Assignment;
using backend.Dtos.ProjectGrade;
using backend.Dtos.ProjectGroup;
using backend.Models;

namespace backend.Services.ProjectGroupServices
{
    public interface IProjectGroupService
    {
        Task<ServiceResponse<GetProjectGroupDto>> GetProjectGroupById(int id);
        Task<ServiceResponse<GetProjectGroupDto>> UpdateProjectGroupInformation(UpdateProjectGroupDto updateProjectGroupDto);
        Task<ServiceResponse<GetProjectGroupDto>> ConfirmationOfStudent(ConfirmationAnswerDto confirmationAnswerDto);
        Task<ServiceResponse<GetProjectGroupDto>> ForceConfirmStudent (int userId, int projectGroupId);
        Task<ServiceResponse<GetProjectGroupDto>> LeaveGroup(int projectGroupId);
        Task<ServiceResponse<GetProjectGroupDto>> KickStudentFromGroup(int projectGroupId, int userId, bool fromInside);
        Task<ServiceResponse<List<GetProjectGroupDto>>> GetProjectGroupsOfSection(int sectionId);
        Task<ServiceResponse<List<GetProjectGroupDto>>> GetProjectGroupsOfUser(int userId);
        Task<ServiceResponse<string>> DeleteProjectGroup(int projectGroupId);
        Task<ServiceResponse<string>> ForceCancelGroup(int projectGroupId);
        Task<ServiceResponse<GetProjectGroupDto>> CompleteJoinRequest(int joinRequestId);
        Task<ServiceResponse<GetProjectGroupDto>> CompleteMergeRequest(int mergeRequestId);
        Task<ServiceResponse<GetProjectGroupDto>> ForceMerge (int senderGroupId, int receiverGroupId);
        Task<ServiceResponse<GetProjectGroupDto>> CreateNewProjectGroupForStudentInSection(int userId, int sectionId);
        Task<ServiceResponse<List<ProjectGradeInfoDto>>> GetInstructorComments(int projectGroupId);
        Task<ServiceResponse<List<ProjectGradeInfoDto>>> GetTaComments(int projectGroupId);
        Task<ServiceResponse<List<ProjectGradeInfoDto>>> GetStudentComments(int projectGroupId);
        Task<ServiceResponse<decimal>> GetGradeWithGraderId(int projectGroupId, int graderId);
        Task<ServiceResponse<decimal>> GetStudentsAverage(int projectGroupId);
        Task<ServiceResponse<GetSrsGradeDto>> UpdateSrsGrade(UpdateSrsGradeDto updateSrsGradeDto);
        Task<ServiceResponse<GetSrsGradeDto>> GetSrsGrade(int projectGroupId);
        Task<ServiceResponse<GetProjectGroupDto>> DeleteSrsGrade(DeleteSrsGradeDto deleteSrsGradeDto);
        Task<ServiceResponse<List<GetFeedItemDto>>> GetAssignments(int courseId);
        Task<ServiceResponse<bool>> IsUserInstructorOfGroup(int projectGroupId, int userId);
    }
}