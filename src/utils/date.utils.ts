interface GetDateTimeProps {
    startDate: Date;
    endDate: Date;
}

const addZeroBefore = (dateAtribut: number) => {
    return dateAtribut < 10 ? '0' + dateAtribut : dateAtribut;
};
export const getDateTime = ({ startDate, endDate }: GetDateTimeProps) => {
    const startDateArr = startDate.toString().split(' ');
    return `
            ${startDateArr[2]}.
            ${addZeroBefore(startDate.getMonth() + 1)}.
            ${startDateArr[3]} 
            ${startDateArr[4].slice(0, -3)} -
            ${endDate.toString().split(' ')[4].slice(0, -3)}
        `;
};
