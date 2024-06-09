import React, { useRef, useEffect } from 'react';
import { Engine, Scene, useBeforeRender } from 'react-babylonjs';
import { Vector3, Color3, StandardMaterial, Texture } from '@babylonjs/core';

const RotatingEarth = () => {
  const earthRef = useRef(null);
  let alpha = 0;

  useBeforeRender(() => {
    if (earthRef.current) {
      alpha += 0.01;
      earthRef.current.position.x = 10 * Math.cos(alpha);
      earthRef.current.position.z = 10 * Math.sin(alpha);
    }
  });

  return (
    <sphere name="earth" ref={earthRef} diameter={1} segments={32} position={new Vector3(10, 0, 0)}>
      <standardMaterial name="earthMat" diffuseTexture={new Texture("https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg")} />
    </sphere>
  );
};

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={30} minZ={0.1} wheelPrecision={50} />
          <hemisphericLight name="light1" intensity={0.75} direction={Vector3.Up()} />
          
          <sphere name="sun" diameter={4} segments={32}>
            <standardMaterial name="sunMat" emissiveColor={Color3.Yellow()} />
          </sphere>
          
          <RotatingEarth />
        </Scene>
      </Engine>
    </div>
  );
};

export default App;
