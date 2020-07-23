import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics, usePlane, useBox, useSphere } from 'use-cannon'
import './App.scss'

const boxPositions = [
	//[1, 0, 3],
	//[2, 1, 5],
	//[0, 0, 6],
	//[-1, 1, 8],
	//[-2, 2, 13],
	//[2, -1, 13],
]

const spherePositions = [
	[1, 0, 4],
	[2, 1, 6],
	[0, 0, 7],
	[-1, 1, 9],
	[-2, 2, 14],
	[2, -1, 14],
]

function Plane(props) {
	const [ref] = usePlane(() => ({
		position: [0, 0, 0],
		rotation: [0, 0, 0],
		...props
	}))
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<shadowMaterial attach="material" color="black" />
			<meshLambertMaterial attach="material" color="hotpink" />
		</mesh>
	)
}

function Box(props) {
	const [ref] = useBox(() => ({
		mass: 1,
		position: [0, 0, 0],
		rotation: [0.4, 0.2, 0.5],
		...props
	}))
	return (
		<mesh receiveShadow castShadow ref={ref}>
			<boxBufferGeometry attach="geometry" />
			<meshLambertMaterial attach="material" color="hotpink" />
		</mesh>
	)
}

function Sphere(props) {
	const [ref] = useSphere(() => ({
		mass: 1,
		position: [2, 2, 2],
		rotation: [0, 0, 0],
		...props
	}))
	return (
		<mesh receiveShadow castShadow ref={ref}>
			<sphereBufferGeometry attach="geometry" />
			<meshLambertMaterial attach="material" color="green" />
		</mesh>
	)
}


function App() {
	return (
		<Canvas
			shadowMap
			sRGB
			gl={{ alpha: false }}
			camera={{ position: [0, -50, 50] }}
		>
			<color attach="background" args={['lightblue']} />
			<hemisphereLight intensity={0.35} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.3}
				penumbra={1}
				intensity={2}
				castShadow
			/>
			<Physics
				gravity={[0, 0, -10]}
			>
				<Plane position={[0, 0, 0]} rotation={[-Math.PI/3, -Math.PI/6, 0]}/>
				<Plane position={[0, 0, 0]} rotation={[0, Math.PI/6, 0]}/>
					{
						boxPositions.map( (position) => {
							return <Box position={position} />
						})
					}
					{
						spherePositions.map( (position) => {
							return <Sphere  position={position}/>
						})
					}
			</Physics>
		</Canvas>
	)
}

export default App;
