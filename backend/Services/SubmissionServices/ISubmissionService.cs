using System.Threading.Tasks;
using backend.Models;
using backend.Dtos.Submission;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace backend.Services.SubmissionServices
{
    public interface ISubmissionService
    {
        Task<ServiceResponse<string>> SubmitAssignment(AddSubmissionFileDto file);
        Task<ServiceResponse<string>> DownloadSubmission(GetSubmissionFileDto dto);
        Task<ServiceResponse<string>> DownloadAllSubmissions(GetSubmissionsFileDto dto);
        Task<ServiceResponse<IEnumerable<string>>> DownloadNotGradedSubmissions(GetUngradedSubmissionFilesDto dto);
        Task<ServiceResponse<string>> DeleteSubmissionFile(DeleteSubmissionFileDto dto);
        Task<ServiceResponse<string>> DeleteWithForce(int submissionId);
        Task<ServiceResponse<string>> Delete(int submissionId);
        Task<ServiceResponse<GetSubmissionDto>> AddSubmission(AddSubmissionDto addSubmissionDto);
        Task<ServiceResponse<GetSubmissionDto>> GetSubmission(int submissionId);
        Task<ServiceResponse<GetSubmissionDto>> UpdateSubmission(UpdateSubmissionDto submissionDto);
    }
}