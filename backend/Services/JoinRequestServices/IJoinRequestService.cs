using System.Collections.Generic;
using backend.Models;
using System.Threading.Tasks;
using backend.Dtos.JoinRequest;

namespace backend.Services.JoinRequestServices
{
    public interface IJoinRequestService
    {
        Task<ServiceResponse<AddJoinRequestDto>> SendJoinRequest(AddJoinRequestDto newJoinRequestDto);
        Task<ServiceResponse<string>> CancelJoinRequest(CancelJoinRequestDto joinRequestDto); 
        Task<ServiceResponse<JoinRequestInfoDto>> Vote(VoteJoinRequestDto joinRequestDto);
    
    }
}