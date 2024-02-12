interface GetDateTimeProps {
    startDate: Date;
    endDate: Date;
}

export const getDateTime = ({ startDate, endDate }: GetDateTimeProps) => {
    const startDateArr = startDate.toLocaleString().split(',');
    const endDateArr = endDate.toLocaleString().split(',');

    return `
            ${startDateArr[0]}.
            ${startDateArr[1].slice(0, -3)} -
            ${endDateArr[1].slice(0, -3)}
        `;
};
