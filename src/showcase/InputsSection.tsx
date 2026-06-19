import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { Section, Demo } from './shared';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange'];

export default function InputsSection() {
  const [select, setSelect] = React.useState('10');
  const [formats, setFormats] = React.useState<string[]>(['bold']);

  return (
    <Section id="inputs" title="Inputs" description="사용자 입력을 받는 폼 요소들">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Autocomplete">
            <Autocomplete
              options={fruits}
              sx={{ width: 220 }}
              renderInput={(params) => <TextField {...params} label="Fruit" />}
            />
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Button">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Button Group">
            <ButtonGroup variant="outlined">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Checkbox">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
            <FormControlLabel control={<Checkbox />} label="Unchecked" />
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Floating Action Button">
            <Fab color="primary" size="small">
              <AddIcon />
            </Fab>
            <Fab color="secondary">
              <AddIcon />
            </Fab>
            <Fab variant="extended" color="primary">
              <AddIcon sx={{ mr: 1 }} />
              Extended
            </Fab>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Radio Group">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row defaultValue="female">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Rating">
            <Rating defaultValue={3} />
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Select">
            <FormControl sx={{ minWidth: 160 }} size="small">
              <InputLabel>Age</InputLabel>
              <Select
                value={select}
                label="Age"
                onChange={(e) => setSelect(e.target.value)}
              >
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
              </Select>
            </FormControl>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Slider">
            <Box sx={{ width: 240 }}>
              <Slider defaultValue={30} valueLabelDisplay="auto" />
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Switch">
            <FormControlLabel control={<Switch defaultChecked />} label="On" />
            <FormControlLabel control={<Switch />} label="Off" />
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Text Field">
            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField label="Outlined" size="small" />
              <TextField label="Filled" variant="filled" size="small" />
              <TextField label="Standard" variant="standard" />
            </Stack>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Toggle Button">
            <ToggleButtonGroup
              value={formats}
              onChange={(_e, next) => setFormats(next)}
              aria-label="text formatting"
            >
              <ToggleButton value="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
