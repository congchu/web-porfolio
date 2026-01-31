const getDaysSinceCoding = () => {
    const startDate = new Date('2021-11-01');
    const today = new Date();
    const diffTime = today - startDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 코딩한 일수 적용
$('#codeDate').attr('data-number', getDaysSinceCoding());


