import { authAxios, BASE_COURSE_URL } from '../axiosConfigs';

export const getCourseRequest = async (courseId) => {
    const url = courseId;

    return authAxios
        .get(BASE_COURSE_URL + url)
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};

export const getCourseStatisticRequest = async (courseId) => {
    const url = 'Statistic/' + courseId;

    return authAxios
        .get(BASE_COURSE_URL + url)
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};