import { Vector3 } from "./vector";
import { Triangle } from "./triangle";
import { floorToNearest, ceilToNearest, xAxis, yAxis, zAxis } from "./math";
import { VoxelManager } from "./voxel_manager";
import { Bounds } from "./util";

const EPSILON = 0.0000001;

export enum Axes {
    x, y, z
}

interface Ray {
    origin: Vector3,
    direction: Vector3,
    axis: Axes
}

export function generateRays(v0: Vector3, v1: Vector3, v2: Vector3): Array<Ray> {
    const bounds: Bounds = {
        minX: Math.floor(Math.min(v0.x, v1.x, v2.x)),
        minY: Math.floor(Math.min(v0.y, v1.y, v2.y)),
        minZ: Math.floor(Math.min(v0.z, v1.z, v2.z)),
        maxX: Math.ceil(Math.max(v0.x, v1.x, v2.x)),
        maxY: Math.ceil(Math.max(v0.y, v1.y, v2.y)),
        maxZ: Math.ceil(Math.max(v0.z, v1.z, v2.z)),
    }

    let rayList: Array<Ray> = [];
    traverseX(rayList, bounds);
    traverseY(rayList, bounds);
    traverseZ(rayList, bounds);
    return rayList;
}

function traverseX(rayList: Array<Ray>, bounds: Bounds) {
    for (let y = bounds.minY; y <= bounds.maxY; ++y) {
        for (let z = bounds.minZ; z <= bounds.maxZ; ++z) {
            rayList.push({
                origin: new Vector3(bounds.minX, y, z),
                direction: new Vector3(1, 0, 0),
                axis: Axes.x
            });
        }
    }
}

function traverseY(rayList: Array<Ray>, bounds: Bounds) {
    for (let x = bounds.minX; x <= bounds.maxX; ++x) {
        for (let z = bounds.minZ; z <= bounds.maxZ; ++z) {
            rayList.push({
                origin: new Vector3(x, bounds.minY, z),
                direction: new Vector3(0, 1, 0),
                axis: Axes.y
            });
        }
    }
}

function traverseZ(rayList: Array<Ray>, bounds: Bounds) {
    for (let x = bounds.minX; x <= bounds.maxX; ++x) {
        for (let y = bounds.minY; y <= bounds.maxY; ++y) {
            rayList.push({
                origin: new Vector3(x, y, bounds.minZ),
                direction: new Vector3(0, 0, 1),
                axis: Axes.z
            });
        }
    }
}

export function rayIntersectTriangle(ray: Ray, v0: Vector3, v1: Vector3, v2: Vector3): (Vector3 | void) {
    const edge1 = Vector3.sub(v1, v0);
    const edge2 = Vector3.sub(v2, v0);

    const h = Vector3.cross(ray.direction, edge2);
    const a = Vector3.dot(edge1, h);

    if (a > -EPSILON && a < EPSILON) {
        return; // Ray is parallel to triangle
    }

    const f = 1.0 / a;
    const s = Vector3.sub(ray.origin, v0);
    const u = f * Vector3.dot(s, h);

    if (u < 0.0 || u > 1.0) {
        return;
    }

    const q = Vector3.cross(s, edge1);
    const v = f * Vector3.dot(ray.direction, q);

    if (v < 0.0 || u + v > 1.0) {
        return;
    }

    const t = f * Vector3.dot(edge2, q);

    if (t > EPSILON) {
        return Vector3.add(ray.origin, Vector3.mulScalar(ray.direction, t));
    }
}