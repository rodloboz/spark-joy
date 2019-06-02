import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Button } from 'rebass'
import { palette } from 'styled-tools'
import ButterToast, { Cinnamon } from "butter-toast"

import { Heading, Flex } from './styles'

import { copyToClipboard } from '../utils'

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  padding: 0 0.5em;
  width: 150px;

  &:focus {
    outline:none;
  }
`

const RoundButton = styled.button`
  border-radius: 100%;
  cursor: pointer;
  font-size: ${palette("headings", 0)};
  line-height: ${palette("headings", 0)};
  width: 2em;
  height: 2em;

  &:focus {
    outline: none;
  }

  &:first-child {
    margin-right: 10px;
  }
`

const Layout = styled.div`
  width: 450px;
  height: 250px;
  display: grid;
  grid-template-rows: 1fr 0.2fr;
`

const WidgetLayout = styled.div`
  width: 450px;
  display: grid;
  grid-template-rows: 0.3fr 0.7fr;
`

const Question = styled(Heading)`
  text-align: center;
`

const Widget = ({ editable, value, update }) => (
  <WidgetLayout>
    <Question h2>
      Did this{" "}
      {editable ? (
        <Input
          type="text"
          value={value}
          onChange={event => update(event.target.value)}
          />
      ) : (
      value
      )}{" "}
        spark joy?
      </Question>
      <Flex row>
        <RoundButton>
          <span role="img" aria-label="thumbs down">👎</span>
        </RoundButton>
        <RoundButton>
          <span role="img" aria-label="thumbs up">👍</span>
        </RoundButton>
      </Flex>
  </WidgetLayout>
)

const WidgetBuilder = () => {
  const [typeOfJoy, setTypeOfJoy] = useState("")

  function exportWidget () {
    const el = document.createElement("div")
    ReactDOM.render(<Widget value={typeOfJoy} />, el)

    copyToClipboard(el.innerHTML)

    ButterToast.raise({
      content: (
        <Cinnamon.Crisp
          scheme={Cinnamon.Crisp.SCHEME_BLUE}
          title="Copied to clipboard!"
          content={() => <div>👍 Paste HTML into your favorite editor</div>}
        />
      ),
    })
  }

  return (
    <Layout>
      <Widget editable value={typeOfJoy} update={setTypeOfJoy} />
      <Button bg="primary" onClick={exportWidget}>Export</Button>
    </Layout>
  )
}

export default WidgetBuilder;