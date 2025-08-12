import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTransition } from "@/components/PageTransition";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ProjectCalendar = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all events: calendar + task
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["calendarEvents"],
    queryFn: async () => {
      // 1) Ambil CalendarEvent
      const calendarRes = await axios.get(
        "http://localhost:4000/api/v1/calendar",
        { withCredentials: true }
      );
      const calendarEvents = calendarRes.data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        createdFrom: "calendar",
      }));

      // 2) Ambil Task with dueDate
      const taskRes = await axios.get(
        "http://localhost:4000/api/v1/task/calendar-events",
        { withCredentials: true }
      );
      const taskEvents = taskRes.data.events.map((task) => ({
        ...task,
        start: new Date(task.start),
        end: new Date(task.end),
        createdFrom: "manual",
      }));

      return [...calendarEvents, ...taskEvents];
    },
  });

  // ✅ Buat CalendarEvent + Task sekaligus
  const addCalendarEvent = useMutation({
    mutationFn: async (newEvent) => {
      const res = await axios.post(
        "http://localhost:4000/api/v1/task/from-calendar",
        newEvent,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["calendarEvents"]);
    },
  });

  // ✅ Hapus hanya CalendarEvent (Task dihapus auto via linkedCalendarId di backend)
  const deleteCalendarEvent = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:4000/api/v1/calendar/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["calendarEvents"]);
    },
  });

  // ✅ Tambah
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Judul agenda:");
    if (title) {
      const newEvent = {
        title,
        start,
        end,
      };
      addCalendarEvent.mutate(newEvent);
    }
  };

  // ✅ Klik event → hapus jika manual
  const handleSelectEvent = (event) => {
    if (event.createdFrom === "calendar") {
      if (window.confirm("Hapus agenda ini?")) {
        deleteCalendarEvent.mutate(event._id);
      }
    } else {
      alert("Event ini berasal dari Task Kanban.\nHapus dari Kanban Board.");
    }
  };

  const eventStyleGetter = (event) => {
    let bg = "#3174ad";
    if (event.createdFrom === "manual") bg = "#f56565";
    if (event.createdFrom === "calendar") bg = "#38a169";

    return {
      style: {
        backgroundColor: bg,
        color: "white",
        borderRadius: "4px",
        border: "none",
        padding: "4px",
      },
    };
  };

  if (isLoading) return <p>Loading Calendar...</p>;

  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-4xl text-[#841618] font-bold mb-4">
          📅 Project Calendar
        </h1>
        <div style={{ height: "75vh" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectCalendar;
