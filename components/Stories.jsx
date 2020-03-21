import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Stories.module.css";
import cx from "classnames";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Spin, Skeleton, notification } from "antd";
import { config } from "../config";

const Story = dynamic(() => import("react-insta-stories"), {
  ssr: false
});

export const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(1);

  React.useEffect(() => {
    fetch(`${config.apiUrl}/stories`, { method: "get" })
      .then(data => data.json())
      .then(setStories)
      .catch(err => {
        console.error(err);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.storiesBlock}>
      <div className={styles.stories}>
        {loading &&
          [1, 2, 3, 4, 5, 6].map(index => (
            <Skeleton.Avatar size={60} key={index} />
          ))}
        {!loading &&
          stories.map((value, index) => {
            const fullscreenMode = isOpen && storyIndex === index;
            const fullSize = (
              <div
                className={cx(styles.storyShow)}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Story
                  stories={stories}
                  defaultInterval={1500}
                  currentIndex={index}
                  onAllStoriesEnd={() => setOpen(false)}
                />
              </div>
            );
            const thumb = (
              <div
                className={cx(
                  styles.storyCircle,
                  stories[index].header
                    ? styles.withHeader
                    : styles.withoutHeader
                )}
                style={{
                  backgroundImage: stories[index].header
                    ? `url( ${stories[index].header.profileImage} ) `
                    : undefined,
                  backgroundSize: "100%"
                }}
                onClick={() => {
                  setOpen(true);
                  setStoryIndex(index);
                }}
              />
            );
            return (
              <Flipper key={value.url} flipKey={fullscreenMode}>
                {fullscreenMode ? (
                  <Flipped
                    opacity={true}
                    scale={true}
                    flipId={`story-${value.url}`}
                  >
                    {fullSize}
                  </Flipped>
                ) : (
                  <Flipped opacity={true} flipId={`story-${value.url}`}>
                    {thumb}
                  </Flipped>
                )}
              </Flipper>
            );
          })}
      </div>
    </div>
  );
};
