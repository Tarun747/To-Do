import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import classes from './ListSection.module.scss'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Checkbox from '@mui/material/Checkbox'

const ListSection = () => {
  const [taskId, setTaskId] = useState()
  const [task, setTask] = useState('')
  const [subTask, setSubTask] = useState('')
  const [drawer, setDrawer] = useState(false)
  const [list, setList] = useState([])
  const handleNewTask = () => {
    if (task !== '') {
      const updateTaskArray = list
      updateTaskArray.push({
        completed: false,
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        task: task,
        subTasks: [],
      })
      setList(updateTaskArray)
      setTask('')
    }
  }

  const openDrawer = (id) => {
    setDrawer(true)
    setTaskId(id)
  }
  const addSubTask = () => {
    if (subTask !== '') {
      let updatedTask = [...list]
      let taskRequested = taskId
      let index = list
        .map((e) => {
          return e.id
        })
        .indexOf(taskRequested)

      updatedTask[index].subTasks.push({
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        task: subTask,
      })
      setList(updatedTask)
      setSubTask('')
      setDrawer(false)
    }
  }

  const removeTask = (taskRequested) => {
    let taskList = [...list]
    let removeIndex = list
      .map((e) => {
        return e.id
      })
      .indexOf(taskRequested)

    if (removeIndex > -1) {
      taskList.splice(removeIndex, 1)
    }
    setList(taskList)
  }

  const removeSubTask = (taskRequested) => {
    debugger
    let taskList = [...list]
    let taskId

    list.map((item) => {
      return item.subTasks
        .map((e) => {
          taskId = item.id
          return e.id
        })
        .indexOf(taskRequested)
    })
    let indexOfMainTask = taskList
      .map((e) => {
        return e.id
      })
      .indexOf(taskId)

    let removeIndex = taskList[indexOfMainTask].subTasks
      .map((e) => {
        return e.id
      })
      .indexOf(taskRequested)
    // .map((e) => {
    //   return e.id
    // })
    // .indexOf(taskRequested)

    if (removeIndex > -1) {
      taskList[indexOfMainTask].subTasks.splice(removeIndex, 1)
    }
    setList(taskList)
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.section}>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth={true}
              id="listInput"
              label="What you like to add"
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              onClick={() => handleNewTask()}
              variant="contained"
              endIcon={<AddIcon />}
            >
              Add
            </Button>
          </Stack>
        </div>
        <div className={classes.section}>
          {list.map((item) => (
            <List>
              <ListItem disablePadding>
                <Grid container>
                  <Grid item xs={1}>
                    <Checkbox
                      checked={item.completed}
                      // onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={9} sx={{ pl: 1, pr: 1 }}>
                    <Typography
                      className={item.completed ? classes.strikeOff : null}
                      variant="h4"
                      component="h6"
                    >
                      {item.task}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => removeTask(item.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => openDrawer(item.id)}
                      aria-label="delete"
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <List sx={{ pl: 4, pr: 4 }}>
                {item.subTasks.length > 0
                  ? item.subTasks.map((item) => (
                      <ListItem>
                        <Grid container>
                          <Grid item xs={11}>
                            <Typography variant="h6" component="h5">
                              {item.task}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => removeSubTask(item.id)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))
                  : null}
              </List>
            </List>
          ))}
        </div>
      </div>
      <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(!drawer)}>
        <div className={classes.drawerContainer}>
          <div className={classes.section}>
            <Stack spacing={2} direction="row">
              <TextField
                fullWidth={true}
                id="subListInput"
                label="What you like to add"
                variant="outlined"
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
              />
              <Button
                onClick={() => addSubTask()}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Stack>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default ListSection
