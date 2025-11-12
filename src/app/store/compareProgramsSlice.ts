import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgramT } from '@/@/lib/types/program-type';
import { BookmarkProgramDetailsT } from '@/@/lib/types/bookmarked-program-type';
import { ProgramDetailsT } from '@/@/lib/types/program-details-type';

interface ComparePrograms {
  uuid: string,
  program: ProgramDetailsT 
}

interface ProgramsState {
  selectedPrograms: ComparePrograms[] ;
}

const initialState: ProgramsState = {
  selectedPrograms: []
};

const programsSlice = createSlice({
  name: 'programsToCompare',
  initialState,
  reducers: {
    addProgram: (state, action: PayloadAction<ComparePrograms>) => {
      const exists = state.selectedPrograms.some(
        program => (program.uuid === action.payload.uuid)
      );
      if (!exists) {
        state.selectedPrograms.push(action.payload);
      }
    },
    removeProgram: (state, action: PayloadAction<string>) => {
      state.selectedPrograms = state.selectedPrograms.filter(
        program => (program.uuid !== action.payload)
      );
    },
  
    clearPrograms: (state) => {
      state.selectedPrograms = [];
    }
  }
});

export const { addProgram, removeProgram, clearPrograms } = programsSlice.actions;
export default programsSlice.reducer;
