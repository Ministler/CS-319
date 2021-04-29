import { Card, Icon, Button } from 'semantic-ui-react';
import { convertMembersToMemberElement } from '../BriefList';

import { AssignmentCardElement, FeedbackCardElement, RequestCardElement } from './CardGroupUI';

export const convertAssignmentsToAssignmentList = (
    assignments,
    onAssignmentClicked,
    onSubmissionClicked,
    onAssignmentFileClicked,
    assignmentIcons
) => {
    const assignmentCardElements = assignments?.map((assignment) => {
        const date = 'Publishment Date: ' + assignment.publishmentDate + ' / Due Date: ' + assignment.dueDate;

        let statusIcon = null;
        if (assignment.status === 'graded') {
            statusIcon = <Icon name="check circle outline" style={{marginLeft: "5px"}}/>;
        } else if (assignment.status === 'submitted') {
            statusIcon = <Icon name="clock outline" style={{marginLeft: "5px"}}/>;
        } else if (assignment.status === 'notsubmitted') {
            statusIcon = <Icon name="remove circle" style={{marginLeft: "5px"}}/>;
        }

        const fileIcon = assignment.file ? <Icon name="file" color='grey'/> : null;

        let onAssignmentClickedId = assignment.submissionId
            ? () => onSubmissionClicked(assignment.projectId, assignment.submissionId)
            : () => onAssignmentClicked(assignment.courseId, assignment.assignmentId);

        return (
            <AssignmentCardElement
                title={assignment.title}
                titleIcon={statusIcon || assignmentIcons}
                titleClicked={onAssignmentClickedId}
                caption={assignment.caption}
                fileIcon={fileIcon}
                fileClicked={onAssignmentFileClicked}
                date={date}
                publisher={assignment.publisher}
            />
        );
    });

    if (!assignmentCardElements) {
        return <div>You Dont Have Any New Feed</div>;
    }

    return (
        <Card.Group as="div" className="AssignmentCardGroup">
            {assignmentCardElements}
        </Card.Group>
    );
};

export const convertNewFeedbacksToFeedbackList = (newFeedbacks, onSubmissionClicked, onProjectClicked) => {
    const newFeedbackCardElements = newFeedbacks ? (
        newFeedbacks.map((feedback) => {
            let titleElement;
            if (feedback.submission) {
                titleElement = (
                    <>
                        <span
                            onClick={() =>
                                onSubmissionClicked(feedback.submission?.projectId, feedback.submission?.submissionId)
                            }>
                            {' '}
                            {feedback.user?.name} Commented to Your {feedback.submission?.assignmentName} Submission in{' '}
                            {feedback.course?.courseName}{' '}
                        </span>
                    </>
                );
            } else if (feedback.project) {
                titleElement = (
                    <>
                        <span onClick={() => onProjectClicked(feedback.project?.projectId)}>
                            Commented to Your {feedback.project?.projectName} Project in {feedback.course?.courseName}{' '}
                        </span>
                    </>
                );
            }
            return (
                <FeedbackCardElement
                    titleElement={titleElement}
                    caption={feedback.feedback?.caption}
                    grade={feedback.feedback?.grade}
                    date={feedback.date}
                />
            );
        })
    ) : (
        <div>No Comments Yet</div>
    );

    return newFeedbackCardElements;
};

export const convertFeedbacksToFeedbackList = (feedbacks, onOpenmodal, onAuthorClicked, userId) => {
    const feedbackCardElements = feedbacks ? (
        feedbacks.map((feedback) => {
            let icons = null;
            if (userId === feedback.userId) {
                icons = (
                    <span>
                        <Icon
                            name="edit"
                            onClick={() =>
                                onOpenmodal(
                                    'isEditFeedbackOpen',
                                    false,
                                    feedback.commentId,
                                    feedback.caption,
                                    feedback.grade
                                )
                            }
                        />
                        <Icon
                            name="delete"
                            onClick={() =>
                                onOpenmodal(
                                    'isDeleteFeedbackOpen',
                                    false,
                                    feedback.commentId,
                                    feedback.caption,
                                    feedback.grade
                                )
                            }
                        />
                    </span>
                );
            }

            return (
                <FeedbackCardElement
                    author={feedback.name ? feedback.name : 'Comment is anonymous'}
                    caption={feedback.caption}
                    grade={feedback.grade ? feedback.grade : 'Grade is anonymous'}
                    date={feedback.date}
                    icons={icons}
                    onAuthorClicked={() => onAuthorClicked(feedback.userId)}
                />
            );
        })
    ) : (
        <div>No Comments Yet</div>
    );

    return (
        <Card.Group as="div" className="AssignmentCardGroup">
            {feedbackCardElements}
        </Card.Group>
    );
};

export const convertSRSFeedbackToSRSCardElement = (
    SRSResult,
    isTAorInstructor,
    onModalOpenedWithComments,
    onAuthorClicked,
    onmodalOpened
) => {
    if (SRSResult) {
        let icons = null;
        if (isTAorInstructor) {
            icons = (
                <span>
                    <Icon
                        name="delete"
                        color="red"
                        style={{float:"right"}}
                        onClick={() =>
                            onModalOpenedWithComments(
                                'isDeleteFeedbackOpen',
                                true,
                                SRSResult.commentId,
                                SRSResult.caption,
                                SRSResult.grade,
                                SRSResult.file,
                                SRSResult.maxGrade
                            )
                        }
                    />
                    <Icon
                        name="edit"
                        color="blue"
                        style={{float: "right"}}
                        onClick={() =>
                            onModalOpenedWithComments(
                                'isEditFeedbackOpen',
                                true,
                                SRSResult.commentId,
                                SRSResult.caption,
                                SRSResult.grade,
                                SRSResult.file,
                                SRSResult.maxGrade
                            )
                        }
                    />
                </span>
            );
        }

        return (
            <Card.Group as="div" className="AssignmentCardGroup">
                <FeedbackCardElement
                    author={SRSResult.name}
                    onAuthorClicked={() => onAuthorClicked(SRSResult.userId)}
                    caption={SRSResult.caption}
                    grade={SRSResult.grade}
                    date={SRSResult.date}
                    icons={icons}
                    maxGrade={SRSResult.maxGrade}
                />
            </Card.Group>
        );
    } else if (isTAorInstructor) {
        return <Button onClick={() => onmodalOpened('isGiveFeedbackOpen', true)}>Add SRS Grade</Button>;
    } else {
        return <div>No SRS Feedback</div>;
    }
};

export const convertRequestsToRequestsList = (
    requests,
    requestsType,
    requestStatus,
    onUserClicked,
    onRequestApproved,
    onRequestDisapproved
) => {
    return (
        <Card.Group as="div" className="AssignmentCardGroup">
            {requests ? (
                requests.map((request) => {
                    let yourGroup = null;
                    if (request.yourGroup) {
                        yourGroup = convertMembersToMemberElement(request.yourGroup, onUserClicked);
                    }

                    let otherGroup = null;
                    if (request.otherGroup) {
                        otherGroup = convertMembersToMemberElement(request.otherGroup, onUserClicked);
                    }

                    let titleStart, titleMid, userName, userId;
                    let voteIcons = null;

                    if (requestsType === 'incoming') {
                        if (request.type === 'Join') {
                            userName = request.user?.name;
                            userId = request.user?.userId;
                        }

                        if (request.type === 'Merge') {
                            const requestOwner = request.otherGroup?.find((user) => {
                                return user.requestOwner;
                            });

                            userName = requestOwner?.name;
                            userId = requestOwner?.userId;
                        }

                        if (requestStatus === 'pending') {
                            titleMid = ' wants to ' + request.type + ' your group ';

                            voteIcons = (
                                <>
                                    <p style={{ display: 'inline', }}>Approved: {request.voteStatus}&nbsp;</p>
                                    <Icon
                                        onClick={() => onRequestApproved(request.requestId, request.type, userName)}
                                        name="checkmark"
                                        color="blue"
                                    />
                                    <Icon
                                        onClick={() => onRequestDisapproved(request.requestId, request.type, userName)}
                                        name="x"
                                        color="red"
                                    />
                                </>
                            );
                        }

                        if (requestStatus === 'unresolved') {
                            titleStart = 'You approved ' + request.type + ' request of ';
                            voteIcons = (
                                <p style={{ display: 'inline', }}>Approved: {request.voteStatus}&nbsp;</p>
                            );
                        }

                        if (requestStatus === 'resolved') {
                            titleStart =
                                request.type + ' request of ';
                            titleMid = ' ' + request.status;
                        }
                    } else if (requestsType === 'outgoing') {
                        if (request.type === 'Join') {
                            userName = 'Your ';
                        }

                        if (request.type === 'Merge') {
                            if (request.isRequestOwner) {
                                userName = 'You ';
                            } else {
                                const requestOwner = request.yourGroup?.find((user) => {
                                    return user.requestOwner;
                                });
                                userName = requestOwner?.name;
                                userId = requestOwner?.userId;
                            }
                        }

                        if (requestStatus === 'pending') {
                            titleMid = ' send a ' + request.type + ' request';

                            voteIcons = (
                                <>
                                    <p style={{ display: 'inline', }}>Approved: {request.voteStatus}&nbsp;</p>
                                    <Icon
                                        onClick={() => onRequestApproved(request.requestId, request.type, userName)}
                                        name="checkmark"
                                        color="blue"
                                    />
                                    <Icon
                                        onClick={() => onRequestDisapproved(request.requestId, request.type, userName)}
                                        name="x"
                                        color="red"
                                    />
                                </>
                            );
                        }

                        if (requestStatus === 'unresolved') {
                            titleMid = ' send a ' + request.type + ' request';

                            voteIcons = (
                                <>
                                    <p style={{ display: 'inline', }}>Approved: {request.voteStatus}&nbsp;</p>
                                </>
                            );
                        }

                        if (requestStatus === 'resolved') {
                            titleMid =
                                ' ' + request.type + ' request ' + request.status;
                        }
                    }

                    return (
                        <RequestCardElement
                            titleStart={titleStart}
                            titleMid={titleMid}
                            userName={userName}
                            message={request.message}
                            courseName={request.course}
                            yourGroup={yourGroup}
                            otherGroup={otherGroup}
                            voteStatus={request.voteStatus}
                            voteIcons={voteIcons}
                            requestDate={request.requestDate}
                            formationDate={request.formationDate}
                            approvalDate={request.approvalDate}
                            disapprovalDate={request.disapprovalDate}
                            onUserClicked={() => onUserClicked(userId)}
                        />
                    );
                })
            ) : (
                <div>
                    You Dont have any {requestsType} {requestStatus} requests
                </div>
            )}
        </Card.Group>
    );
};
