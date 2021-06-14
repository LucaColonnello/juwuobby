import ReactSplitPane from "react-split-pane";

export default function SplitPane({ children, ...reactSplitPaneProps }) {
  return (
    <>
      <ReactSplitPane {...reactSplitPaneProps}>{children}</ReactSplitPane>
      <style jsx global>{`
        .Resizer {
          position: relative;
          background: #ddd;
          box-sizing: border-box;
          background-clip: padding-box;
        }

        /*
        .Resizer:hover,
        .Resizer:active {
          -webkit-transition: all 2s ease;
          transition: all 2s ease;
        }*/

        .Resizer.horizontal {
          height: 11px;
          margin: -5px 0;
          border-top: 5px solid rgba(255, 255, 255, 0);
          border-bottom: 5px solid rgba(255, 255, 255, 0);
          cursor: row-resize;
          width: 100%;
        }
        /*
        .Resizer.horizontal:hover,
        .Resizer.Resizer.horizontal:active {
          border-top: 5px solid rgba(0, 0, 0, 0.5);
          border-bottom: 5px solid rgba(0, 0, 0, 0.5);
        }*/

        .Resizer.vertical {
          width: 16px;
          margin: 0 -5px;
          border-left: 5px solid rgba(255, 255, 255, 0);
          border-right: 5px solid rgba(255, 255, 255, 0);
          cursor: col-resize;
        }

        /*
        .Resizer.vertical:hover,
        .Resizer.vertical:active {
          border-left: 5px solid rgba(0, 0, 0, 0.5);
          border-right: 5px solid rgba(0, 0, 0, 0.5);
        }
        */

        .Resizer.disabled {
          cursor: not-allowed;
        }
        .Resizer.disabled:hover,
        .Resizer.disabled:active {
          border-color: transparent;
        }

        .Resizer::after,
        .Resizer::before {
          content: "";
          border-left: 1px solid #888;
          position: absolute;
          top: 50%;
          transform: translateY(-100%);
          right: 0;
          display: inline-block;
          height: 20px;
          margin: 0 2px;
        }
        .Resizer::before {
          left: 0;
        }
      `}</style>
    </>
  );
}
