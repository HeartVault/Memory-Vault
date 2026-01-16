import { NextResponse } from "next/server";
import { SupabasePostRepository } from "@/src/infrastructure/repositories/supabasePostRepository";
import { GetPostByIdUseCase } from "@/src/application/use-cases/posts/GetById.usecase";
import {
  updatePostDto,
  UpdatePostDto,
} from "@/src/application/dto/posts/UpdatePostDto";
import { UpdatePostUseCase } from "@/src/application/use-cases/posts/UpdatePost.usecase";
import { DeletePostUseCase } from "@/src/application/use-cases/posts/DeletePost.usecase";
import { PostMapper } from "@/src/application/mappers/PostMapper";

export async function GET(
  req: Request,
  { params }: { params: { postid: string } }
) {
  try {
    const repo = new SupabasePostRepository();
    const useCase = new GetPostByIdUseCase(repo);

    const post = await useCase.execute(params.postid);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(PostMapper.toResponseDto(post), { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postid: string } }
) {
  try {
    const body = await req.json();
    const dto = updatePostDto.parse(body);

    const repo = new SupabasePostRepository();
    const useCase = new UpdatePostUseCase(repo);

    const updated = await useCase.execute(params.postid, dto);

    return NextResponse.json(PostMapper.toResponseDto(updated), {
      status: 200,
    });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json(
        { message: "Validation error", errors: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postid: string } }
) {
  try {
    const repo = new SupabasePostRepository();
    const useCase = new DeletePostUseCase(repo);

    await useCase.execute(params.postid);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
