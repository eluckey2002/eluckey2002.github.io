import Tabletop from 'tabletop'

const ROW_HEIGHT = 30
const ROW_MARGIN = 10
const SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/121-56BwZe8Cws0A8xE_cSGXc64YD_bBPfQM8o2YVnaM/edit?usp=sharing'


let icon =
  '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'

miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Hi',
        svgIcon: icon,
        onClick: async () => {
          alert('Hi!')
        },
      },
    },
  })
})



async function syncWithSheet() {
  const appId = await miro.getClientId()
  const items = await Tabletop.init({
    key: SPREADSHEET_URL,
    simpleSheet: true,
  })
  const viewport = await miro.board.viewport.get()
  const maxWidth = Math.max(...items.map((item) => item.rate)) * 2

  items.forEach(async ({role, rate}, i) => {
    rate = parseFloat(rate)

    const shapes = (
      await miro.board.widgets.get({
        type: 'shape',
      })
    ).filter((shape) => !!shape.metadata[appId])
    const shape = shapes.find((shape) => shape.metadata[appId].role === role)
    const width = rate * 2

    if (shape) {
      const x = shape.x - (shape.width - width) / 2
      miro.board.widgets.update([{id: shape.id, text: `${rate}%`, width, x}])
    } else {
      const x = viewport.x + viewport.width / 2 - (maxWidth - width) / 2
      const y = viewport.y + ROW_HEIGHT / 2 + (ROW_HEIGHT + ROW_MARGIN) * i
      miro.board.widgets.create({
        type: 'shape',
        text: `${rate}%`,
        width,
        height: ROW_HEIGHT,
        x,
        y,
        style: {
          borderWidth: 0,
          backgroundColor: '#4262ff',
          fontSize: 8,
          textAlign: 'c',
          textAlignVertical: 'm',
          textColor: '#ffffff',
        },
        metadata: {
          [appId]: {
            role,
          },
        },
      })
      miro.board.widgets.create({
        type: 'text',
        x: viewport.x + viewport.width / 2 - maxWidth - 110,
        y,
        width: 400,
        style: {
          textAlign: 'r',
          fontSize: 12,
        },
        text: role,
        metadata: {
          [appId]: {
            role,
          },
        },
      })
    }
  })
}
