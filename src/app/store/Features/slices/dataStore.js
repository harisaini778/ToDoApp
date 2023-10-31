"use client"

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    incompleteTasks : [],
    completedTasks: [],
    importantTasks: [],
    modalIsClicked: false,
    addNewTaskIsClicked: false,
    leftOffCanvasIsClicked: true,
    IncompleteIsClicked: true,
    CompletedIsClicked: false,
    ImportantIsClciked: false,
    showTaskModal: true,
    
    
}

export const fetchAllTodo = createAsyncThunk(
  "slices/fetchAllTodo",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api");
      if (!response.ok) {
        throw new Error("Failed to fetch todo's");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAllImportantTodo = createAsyncThunk(
    "slices/importantTasks",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3000/api/importantTaskRoute");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const fetchAllCompletedTodo = createAsyncThunk(
    "slices/completedTasks",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3000/api/completedTaskRoute");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


const todoSlice = createSlice({

    name: "todoSlice",
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            state.incompleteTasks = action.payload;
        },
        markAsImportant: (state, action) => {
            const taskId = action.payload;
            const todoIndex = state.incompleteTasks.findIndex((item) =>
                item._id === taskId);
            if (todoIndex !== -1) {
                const importantTask = state.incompleteTasks[todoIndex];
                state.importantTasks.push(importantTask);
                state.incompleteTasks = state.incompleteTasks.filter((todo) => todo._id !== taskId);
            }
        },
        markAsComplete: (state, action) => {
            const taskId = action.payload;
            const todoIndex = state.incompleteTasks.findIndex((item) =>
                item.id === taskId);
            if (todoIndex !== -1) {
                const completedTask = state.incompleteTasks[todoIndex];
                state.completedTasks.push(completedTask);
                state.incompleteTasks = state.incompleteTasks.filter((todo) => todo._id !== taskId);
            }
        },
        toggleModalIsClicked: (state) => {
            state.modalIsClicked = !state.modalIsClicked;
        },
        toggleAddNewTaskIsClicked: (state) => {
            state.addNewTaskIsClicked = !state.addNewTaskIsClicked;
        },
        toggleLeftOffCanvasIsClicked: (state) => {
            state.leftOffCanvasIsClicked = !state.leftOffCanvasIsClicked;
        },
        toggleIncompleteIsClicked: (state) => {
            state.IncompleteIsClicked = !state.IncompleteIsClicked;
            state.CompletedIsClicked = false;
            state.ImportantIsClciked = false;
        },
        toggleCompletedIsClicked: (state) => {
            state.CompletedIsClicked = !state.CompletedIsClicked;
            state.IncompleteIsClicked = false;
            state.ImportantIsClciked = false;
        },
        toggleImportantIsClicked: (state) => {
            state.ImportantIsClciked = !state.ImportantIsClciked;
            state.IncompleteIsClicked = false;
            state.CompletedIsClicked = false;
        },

        toggleTaskModelHandler: (state) => {
            state.showTaskModal = !state.showTaskModal;
        },
    },
     extraReducers: (builder) => {
    builder.addCase(fetchAllTodo.fulfilled, (state, action) => {
        state.incompleteTasks = action.payload;
    });
    builder.addCase(fetchAllImportantTodo.fulfilled, (state, action) => {
        state.importantTasks = action.payload;
    });
    builder.addCase(fetchAllCompletedTodo.fulfilled, (state, action) => {
        state.completedTasks = action.payload;
    });
}


});

export const {
    incompleteTasks,
    completedTasks,
    importantTasks,
    modalIsClicked,
    addNewTaskIsClicked,
    leftOffCanvasIsClicked,
    IncompleteIsClicked,
    CompletedIsClicked,
    ImportantIsClciked,
    showTaskModal,


    addNewTask,
    markAsImportant,
    markAsComplete,
    toggleModalIsClicked,
    toggleAddNewTaskIsClicked,
    toggleLeftOffCanvasIsClicked,
    toggleIncompleteIsClicked,
    toggleCompletedIsClicked,
    toggleImportantIsClicked,
    toggleTaskModelHandler,

    
} = todoSlice.actions;


export default todoSlice.reducer;

