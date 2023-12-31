import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getYearlyStatsApi } from "src/store/slices/attendanceSlice/AllStatsSlice/api";
import qs from "qs";
import { format } from "date-fns";
import { DatePicker, Flex } from "antd";
import dayjs from "dayjs";
import { AttendanceStatusColor } from "src/constant/colors";
import Loader from "src/components/Loader";

const BarChart = () => {
    const [allStats, setAllStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const getYearlylStats = async (year = new Date()) => {
        const queryParams = qs.stringify({
            year: format(new Date(year), "yyyy"),
        });

        try {
            const res = await dispatch(getYearlyStatsApi(queryParams)).unwrap();
            setAllStats(res?.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getYearlylStats();
    }, []);

    if (isLoading || !allStats) {
        return <Loader />
    }

    const months = allStats ? Object.keys(allStats) : [];

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Leave",
                data: months.map((month) => allStats?.[month].leave),
                backgroundColor: AttendanceStatusColor.Leave,
            },
            {
                label: "Absent",
                data: months.map((month) => allStats?.[month].absent),
                backgroundColor: AttendanceStatusColor.Absent,
            },
            {
                label: "Half Day",
                data: months.map((month) => allStats?.[month].halfDay),
                backgroundColor: AttendanceStatusColor.HalfDay,
            },
            {
                label: "Present",
                data: months.map((month) => allStats?.[month].present),
                backgroundColor: AttendanceStatusColor.Present,
            },
            {
                label: "Total",
                data: months.map((month) => allStats?.[month].total),
                backgroundColor: "rgba(153,102,255,0.6)",
            },
        ],
    };

    const handleYearlyReports = (e) => {
        getYearlylStats(e);
    };

    const disabledDate = (current) => {
        return current && current > dayjs().endOf("day");
    };

    return (
        <div
            style={{
                boxShadow: "4px 2px 20px -7px  rgba(0,0,0,0.2)",
                marginTop: "40px",
                padding: "20px",
            }}
        >
            <Flex justify="space-between" align="center" className="mb-2">
                <h5 style={{ color: "#4154F1", marginBottom: "10px" }}>
                    Yearly Reports
                </h5>

                <DatePicker
                    picker="year"
                    onChange={handleYearlyReports}
                    allowClear={false}
                    defaultValue={dayjs()}
                    disabledDate={disabledDate}
                />
            </Flex>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
