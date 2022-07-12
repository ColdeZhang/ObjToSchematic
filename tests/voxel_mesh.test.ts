import { Vector3 } from '../src/vector';
import { VoxelMesh } from '../src/voxel_mesh';
import { RGBAColours } from '../src/colour';

test('Voxel neighbours', () => {
    const voxelMesh = new VoxelMesh();
    voxelMesh.addVoxel(new Vector3(1, 2, 3), RGBAColours.WHITE);

    expect(voxelMesh.getNeighbours(new Vector3(1, 2, 3)).value).toBe(0);

    // Even though this neighbour does exist, it is not calculated as
    // this relationship is never tested
    expect(voxelMesh.hasNeighbour(new Vector3(1, 2, 3).add(new Vector3(1, 0, 0)), new Vector3(-1, 0, 0))).toBe(false);

    expect(voxelMesh.hasNeighbour(new Vector3(1, 2, 3).add(new Vector3(1, 1, 0)), new Vector3(-1, -1, 0))).toBe(true);
    expect(voxelMesh.hasNeighbour(new Vector3(1, 2, 3).add(new Vector3(-1, -1, 0)), new Vector3(1, 1, 0))).toBe(true);
    expect(voxelMesh.hasNeighbour(new Vector3(1, 2, 3).add(new Vector3(1, -1, 1)), new Vector3(-1, 1, -1))).toBe(true);
    expect(voxelMesh.hasNeighbour(new Vector3(1, 2, 3).add(new Vector3(-1, 0, 1)), new Vector3(1, 0, -1))).toBe(true);
});