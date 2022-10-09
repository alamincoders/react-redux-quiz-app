import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { decode } from "html-entities";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions/actions";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const { question_category, question_difficulty, question_type, amount_of_question, score } = useSelector((state) => state);

  let apiUrl = `/api.php?amount=${amount_of_question}`;

  if (question_category) {
    apiUrl.concat(`&category=${question_category}`);
  }

  if (question_difficulty) {
    apiUrl.concat(`&difficulty=${question_difficulty}`);
  }

  if (question_type) {
    apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(options);

  useEffect(() => {
    if (response?.results.length) {
      const question = response?.results[questionIndex];

      let answers = [...question.incorrect_answers];
      answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
      setOptions(answers);
    }
  }, [questionIndex, response?.results]);

  if (loading) {
    if (loading) {
      return (
        <Box mt={20}>
          <CircularProgress />
        </Box>
      );
    }
  }

  const handleClickAnswer = (e) => {
    const question = response?.results[questionIndex];

    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/scorecard");
    }
  };

  return (
    <Box>
      <Box height="200px">
        <Typography variant="h4">Questions {questionIndex + 1}</Typography>
        <Typography mt={5} variant="h6">
          {decode(response.results[questionIndex].question)}
        </Typography>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {options.map((data, id) => (
          <Grid item xs={6} key={id} mt={2} width="100%">
            <Button sx={{ backgroundColor: "lightgreen", padding: "15px 18px" }} variant="contained" className="button" onClick={handleClickAnswer}>
              {decode(data)}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;
