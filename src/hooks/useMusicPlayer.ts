import {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {Sounds} from '../assets/sounds';
export default function useMusicPlayer() {
  const [enabledMusic, setEnabledMusic] = useState(true);
  const [musicTheme, setMusicTheme] = useState<Sound | undefined>(
    new Sound(Sounds.dota2Theme, error => {
      if (error) {
        return;
      }
      if (musicTheme) {
        musicTheme.play(() => {
          musicTheme.release();
        });
      }
    }),
  );

  useEffect(() => {
    Sound.setCategory('Playback', true);
    return () => {
      if (musicTheme) {
        musicTheme.release();
      }
    };
  }, [musicTheme]);

  const stopMusic = () => {
    if (!musicTheme) {
      return;
    }
    musicTheme.stop(() => {
      console.log('Stop Playing...');
      musicTheme.release();
    });
    setMusicTheme(undefined);
  };

  const playMusic = () => {
    if (musicTheme) {
      musicTheme.play();
    } else {
      const newMusicTheme = new Sound(Sounds.dota2Theme, error => {
        if (error) {
          return;
        }
        newMusicTheme.play(() => {
          newMusicTheme.release();
        });
      });
      setMusicTheme(newMusicTheme);
    }
  };
  return {playMusic, stopMusic, setEnabledMusic, enabledMusic};
}
