import { NextResponse, NextRequest } from "next/server";
import { SupabasePostRepository } from "@/src/infrastructure/repositories/supabasePostRepository";
import { CreatePostUseCases } from "@/src/application/use-cases/posts/CreatePost.usecase";
import { GetAllPostsUseCase } from "@/src/application/use-cases/posts/GetAllPost.usecase";
import { createPostDto } from "@/src/application/dto/posts/CreatePostDto";
import { PostMapper } from "@/src/application/mappers/PostMapper";

export async function POST(req: NextRequest) {
  try {
    const body = req.json();
    const dto = createPostDto.parse(body);

    const repo = new SupabasePostRepository();
    const useCase = new CreatePostUseCases(repo);

    const post = await useCase.execute(dto);

    const response = PostMapper.toResponseDto(post);

    return NextResponse.json(response, { status: 201 });
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

export async function GET() {
  try {
    const repo = new SupabasePostRepository();
    const useCase = new GetAllPostsUseCase(repo);

    const posts = await useCase.execute();

    return NextResponse.json(posts.map(PostMapper.toResponseDto), {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
