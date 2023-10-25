
export const getAllEvents = (state) => state?.agenda?.events;
export const getSelectedEvent = (state) => state?.agenda?.selectedEvent;
export const checkEventDrawer = (state) => state?.agenda?.isEventDrawer;
export const isSalesDrawer = (state) => state?.agenda?.isSalesDrawer;
export const checkNotesDrawer = (state) => state?.agenda?.isNotesDrawer;
export const isClientEventDrawer = (state) => state?.agenda?.isClientEventDrawer;
export const isEventLaoding = (state) => state?.agenda?.isLoading;


